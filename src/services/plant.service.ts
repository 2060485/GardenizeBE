import { IPlant } from "../interfaces/plant.interface";
import { Plant } from "../models/plant.model";
import { PI } from "../models/pi.model";
import { User } from "../models/user.model";

export class PlantService {

    public static async getPlant(idPlant: string): Promise<IPlant | null> {
        try {
            const plant = await Plant.findById(idPlant);
            if (!plant) {
                console.log("Plant with ID not found sad");
                return null;
            }
            return plant;
        } catch (err) {
            console.log(err);
            throw new Error("Error fetching plant");
        }
    }

    public static async getAllPlants(): Promise<IPlant[]> {
        try {
            const plants = await Plant.find();
            if (plants.length === 0) {
                console.log("No plants found");
            }
            return plants;
        } catch (err) {
            console.log(err);
            throw new Error("Error fetching plants");
        }
    }

    public static async postPlant(newPlantData: IPlant): Promise<IPlant> {
        try {
            const newPlant = new Plant(newPlantData);
            await newPlant.save();
            console.log("New plant added successfully!");
            return newPlant;
        } catch (err) {
            console.log(err);
            throw new Error("Error adding new plant");
        }
    }

    public static async updatePlant(idPlant: string, updateData: Partial<IPlant>): Promise<IPlant | null> {
        try {
            const updatedPlant = await Plant.findByIdAndUpdate(idPlant, updateData, { new: true });

    
            if (!updatedPlant) {
                console.log("Plant with ID not found for update");
                return null;
            }
    
            console.log("Plant updated successfully!");
            return updatedPlant;
        } catch (err) {
            console.log(err);
            throw new Error("Error updating plant");
        }
    }
    
    public static async deletePlant(idPlant: string): Promise<IPlant | null> {
        try {
            const deletedPlant = await Plant.findByIdAndDelete(idPlant);
    
            if (!deletedPlant) {
                console.log("Plant with ID not found for deletion");
                return null;
            }
    
            console.log("Plant deleted successfully!");
            return deletedPlant;
        } catch (err) {
            console.log(err);
            throw new Error("Error deleting plant");
        }
    }

    public static async getPlantsByUserID(userID: number): Promise<IPlant[]> {
        try {
            const user = await User.findById(userID);
            if (!user) {
                console.log("User not found");
                return [];
            }
            const raspIDs = user.raspberry_pis.map(rpi => rpi.raspID);
            if (raspIDs.length === 0) {
                console.log("No raspberry_pis found for this user");
                return [];
            }
            const piList = await PI.find({ _id: { $in: raspIDs } });
            if (piList.length === 0) {
                console.log("No PIs found for these raspIDs");
                return [];
            }
            const captorIDs = [];
            for (const pi of piList) {       
                for (const captor of pi.captors) {
                    captorIDs.push(captor.captorid);
                }
            }
            const plants = await Plant.find({ captorID: { $in: captorIDs } });
            if (plants.length === 0) {
                console.log("No plants found for the given captorIDs");
                return [];
            }
            return plants;
        } catch (err) {
            console.log(err);
            throw new Error("Error fetching plants by userID");
        }
    }    
    
}
