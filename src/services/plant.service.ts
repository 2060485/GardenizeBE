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
}
