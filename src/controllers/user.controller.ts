import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
    public async getAllUsers(req: Request, res: Response): Promise<void> {
        const users = await UserService.getAllUsers();
        if (!users || users.length === 0) {
            res.status(404).json({ message: "No users found." });
        } else {
            res.status(200).json(users);
        }
    }

    public async createNewUser(req: Request, res: Response): Promise<void> {
        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required." });
            return;
        }

        const newUser = await UserService.createNewUser(email, password);
        res.status(newUser.http).json(newUser.data);
    }

    public async updateUser(req: Request, res: Response): Promise<void> {
        const { email, role, enableNotifications, enableAlarm } = req.body;
        const { id } = req.params;
    
        if (!email && role === undefined && enableNotifications === undefined && enableAlarm === undefined) {
            res.status(400).json({ message: "At least one field (email, role, notifications, alarm) must be provided." });
            return;
        }
    
        const updatedData: any = {};
        
        if (email) updatedData.email = email;
        if (role !== undefined) updatedData.role = role;
        if (enableNotifications !== undefined) updatedData.settings = { ...updatedData.settings, enableNotifications };
        if (enableAlarm !== undefined) updatedData.settings = { ...updatedData.settings, enableAlarm };
    
        try {
            const updatedUser = await UserService.modifyUser(id, updatedData);
            res.status(updatedUser.http).json(updatedUser.data);
        } catch (error) {
            res.status(500).json({ message: "Something went wrong while updating the user." });
        }
    }
    
    public async deleteUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        const deletedUser = await UserService.deleteUser(id);
        res.status(deletedUser.http).json(deletedUser.data);
    }

    public async findUserByEmail(req: Request, res: Response): Promise<void> {
        const { email } = req.params;

        const user = await UserService.findByEmail(email);
        res.status(user.http).json(user.data);
    }
    
    public async getUserSettings(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.body.user.id;
            const settings = await UserService.getUserSettings(userId);
    
            if (!settings) {
                res.status(404).json({ message: "Settings not found." });
                return;
            }
    
            res.status(200).json(settings);
        } catch (error) {
            console.error('Error fetching user settings:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    
    public async updateUserSettings(req: Request, res: Response): Promise<void> {
        const userId = req.body.user.id; 
        const { enableNotifications, enableAlarm } = req.body;
    
        if (typeof enableNotifications === 'undefined' || typeof enableAlarm === 'undefined') {
            res.status(400).json({ message: 'Both settings (enableNotifications and enableAlarm) are required.' });
            return;
        }
    
        try {
            const updatedUser = await UserService.updateSettings(userId, enableNotifications, enableAlarm);
    
            if (updatedUser) {
                res.status(200).json({ message: 'Settings updated successfully.', data: updatedUser });
            } else {
                res.status(404).json({ message: 'User not found or failed to update settings.' });
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: 'Internal server error.', error: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error.', error: 'An unknown error occurred.' });
            }
        }
    }    

    public async addPiToUser(req: Request, res: Response): Promise<void> {
        const {  piId, authNumber } = req.body;
        const userId = req.body.user.id;

        if (!userId || !piId || !authNumber) {
            res.status(400).json({ message: "userId, piId, and authNumber are required." });
            return;
        }

        try {
            const response = await UserService.addPiToUser(userId, piId, authNumber);
            res.status(response.http).json(response.data);
        } catch (error) {
            console.error('Error adding PI to user:', error);
            res.status(500).json({ message: 'Internal server error.' });
        }
    }

    public async getUserPis(req: Request, res: Response): Promise<void> {
        const userId = req.body.user.id;
    
        try {
            const response = await UserService.getPi(userId);
            res.status(response.http).json(response.data);
        } catch (error) {
            console.error("Error fetching user's Raspberry Pis:", error);
            res.status(500).json({ message: "Internal server error." });
        }
    }

    public async removePiFromUser(req: Request, res: Response): Promise<void> {
        const { piId } = req.body;
        const userId = req.body.user.id;
    
        if (!userId || !piId) {
            res.status(400).json({ message: "userId and piId are required." });
            return;
        }
    
        try {
            const response = await UserService.removePiFromUser(userId, piId);
            res.status(response.http).json(response.data);
        } catch (error) {
            console.error('Error removing PI from user:', error);
            res.status(500).json({ message: 'Internal server error.' });
        }
    }
    
    public async getUserNotifications(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.body.user.id;
            const notifications = await UserService.getUserNotifications(userId);
    
            if (!notifications) {
                res.status(404).json({ message: "Notifications not found." });
                return;
            }
    
            res.status(200).json(notifications);
        } catch (error) {
            console.error('Error fetching user notifications:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public async deleteUserNotification(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.body.user.id;
            const notifId = parseInt(req.params.notifId, 10);
    
            if (isNaN(notifId)) {
                res.status(400).json({ message: "Invalid notification ID." });
                return;
            }
    
            const success = await UserService.deleteUserNotification(userId, notifId);
    
            if (!success) {
                res.status(404).json({ message: "Notification not found." });
                return;
            }
    
            res.status(200).json({ message: "Notification deleted successfully." });
        } catch (error) {
            console.error("Error deleting notification:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
