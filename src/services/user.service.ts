import { User } from '../models/user.model';
import { logger } from '../utils/logger';
import bcrypt from 'bcryptjs';
import { PI } from '../models/pi.model';

export class UserService {

    public static async getAllUsers() {
        try {
            const users = await User.find();
            logger.info("The user's list has been retrieved");
            return users;
        } catch (error) {
            logger.error("Unable to retrieve users. Error: " + error);
        }
    }

    public static async createNewUser(email: string, password: string) {
        let code: number;
        let message: any;

        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                code = 409;
                message = { mess: "User with this email already exists" };
                logger.info(message);
                return { data: message, http: code };
            }

            const encryptedPwd = await bcrypt.hash(password, 10);

            const user = new User({
                email: email,
                password: encryptedPwd,
            });

            const newUser = await user.save();
            message = { mess: "The user has been created", data: newUser };
            logger.info(message);
            code = 201;
        } catch (error) {
            message = { mess: "Something went wrong", data: error };
            logger.error(message);
            code = 500;
        }

        return { data: message, http: code };
    }

    public static async modifyUser(id: string, updatedData: any) {
        let code: number;
        let message: any;
    
        try {
            const res = await User.findByIdAndUpdate(id, updatedData, { new: true });
    
            if (!res) {
                code = 404;
                message = { message: "User not found." };
            } else {
                code = 200;
                message = { mess: "The user has been modified", data: res };
            }
        } catch (error) {
            message = "Something went wrong: " + error;
            code = 500;
        }
    
        return { data: message, http: code };
    }    

    public static async deleteUser(id: string) {
        let code: number;
        let message: string;
    
        try {
            const user = await User.findById(id);
    
            if (!user) {
                code = 404;
                message = "User not found";
                logger.info(message);
                return { data: message, http: code };
            }
            await User.findByIdAndDelete(id);
            code = 204;
            message = "The user has been deleted";
            logger.info(message);
        } catch (error) {
            message = "Something went wrong: " + error;
            logger.error(message);
            code = 400;
        }
    
        return { data: message, http: code };
    }

    public static async findByEmail(identifier: string) {
        let message: any;
        let code: number;

        try {
            message = await User.findOne({ email: identifier });
            if (message != null) {
                logger.info("The user has been found: " + message);
                code = 200;
            } else {
                message = "The user has not been found";
                logger.info(message);
                code = 404;
            }
        } catch (error) {
            message = "Something went wrong: " + error;
            logger.error(message);
            code = 400;
        }

        return { data: message, http: code };
    }

    public static async getUserSettings(userId: number) {
        try {
            const user = await User.findById(userId);

            if (!user) {
                logger.info("User not found");
                return null; 
            }

            return user.settings;
        } catch (error) {
            logger.error("Error fetching user settings: " + error);
            throw new Error("Failed to fetch user settings");
        }
    }

    public static async updateSettings(userId: number, enableNotifications: boolean, enableAlarm: boolean) {
        try {
            if (!userId) {
                logger.error("User ID is missing");
                throw new Error("User ID is missing");
            }
    
            const user = await User.findById(userId);
    
            if (!user) {
                logger.warn(`User with ID ${userId} not found`);
                return null;
            }
    
            user.settings.enableNotifications = enableNotifications;
            user.settings.enableAlarm = enableAlarm;
    
            const updatedUser = await user.save();
    
            logger.info(`User settings updated for user ${userId}`);
            return updatedUser;
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error(`Error updating settings for user ${userId}: ${error.message}`);
                throw new Error(error.message);
            } else {
                logger.error('Unknown error occurred while updating settings.');
                throw new Error('An unknown error occurred.');
            }
        }
    }
  
    public static async addPiToUser(userId: number, piId: number, authNumber: string) {
        let code: number;
        let message: any;

        try {
            const pi = await PI.findOne({ _id: piId, authNumber: authNumber });
            if (!pi) {
                code = 404;
                message = "No matching PI found for the given ID and auth number";
                logger.info(message);
                return { data: message, http: code };
            }
            const user = await User.findById(userId);
            if (!user) {
                code = 404;
                message = "User not found";
                logger.info(message);
                return { data: message, http: code };
            }
            const existingPi = user.raspberry_pis.find((pi) => pi.raspID === piId);
            if (existingPi) {
                code = 409;
                message = "PI is already linked to the user";
                logger.info(message);
                return { data: message, http: code };
            }
            user.raspberry_pis.push({ raspID: piId });
            const updatedUser = await user.save();
            code = 200;
            message = { mess: "PI successfully added to the user", data: updatedUser };
            logger.info(message);
        } catch (error) {
            message = "Something went wrong: " + error;
            logger.error(message);
            code = 500;
        }
        return { data: message, http: code };
    }

    public static async getPi(userId: number) {
        let code: number;
        let message: any;
    
        try {
            const user = await User.findById(userId);
            if (!user) {
                code = 404;
                message = "User not found";
                logger.info(message);
                return { data: message, http: code };
            }
    
            if (!user.raspberry_pis || user.raspberry_pis.length === 0) {
                code = 404;
                message = "User does not have any associated Raspberry Pis";
                logger.info(message);
                return { data: message, http: code };
            }
    
            code = 200;
            message = { mess: "User has associated Raspberry Pis", data: user.raspberry_pis };
            logger.info(message);
        } catch (error) {
            message = "Something went wrong: " + error;
            logger.error(message);
            code = 500;
        }
        return { data: message, http: code };
    }    

    public static async removePiFromUser(userId: number, piId: number) {
        let code: number;
        let message: any;
    
        try {
            const user = await User.findById(userId);
            if (!user) {
                code = 404;
                message = "User not found";
                logger.info(message);
                return { data: message, http: code };
            }
            const piIndex = user.raspberry_pis.findIndex((pi) => pi.raspID === piId);
            if (piIndex === -1) {
                code = 404;
                message = "PI is not linked to the user";
                logger.info(message);
                return { data: message, http: code };
            }
            user.raspberry_pis.splice(piIndex, 1);
            const updatedUser = await user.save();
            code = 200;
            message = { mess: "PI successfully removed from the user", data: updatedUser };
            logger.info(message);
        } catch (error) {
            message = "Something went wrong: " + error;
            logger.error(message);
            code = 500;
        }
        return { data: message, http: code };
    }    
    public static async getUserNotifications(userId: number) {
        try {
            const user = await User.findById(userId);

            if (!user) {
                logger.info("User not found");
                return null; 
            }

            return user.notifications;
        } catch (error) {
            logger.error("Error fetching user notifications: " + error);
            throw new Error("Failed to fetch user notifications");
        }
    }

    public static async deleteUserNotification(userId: number, notifId: number) {
        try {
            const user = await User.findById(userId);
    
            if (!user) {
                logger.info("User not found");
                return null;
            }
    
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $pull: { notifications: { notifId: notifId } } },
                { new: true }
            );
    
            return updatedUser ? true : false;
        } catch (error) {
            logger.error("Error deleting notification: " + error);
            throw new Error("Failed to delete notification");
        }
    }
}
