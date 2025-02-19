import { IPlant } from "../interfaces/plant.interface";
import { Plant } from "../models/plant.model";

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
    
}
