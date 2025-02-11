import { IPlant } from "../interfaces/plant.interface";
import { Plant } from "../models/plant.model";

export class PlantService {
    
    public static async getPlant(idPlant: string): Promise<IPlant | null> {
        try {
            const plant = await Plant.findById(idPlant);
            if (!plant) {
                console.warn(`Plant with ID ${idPlant} not found`);
                return null;
            }
            return plant;
        } catch (err) {
            console.log(err);
            throw new Error("Error fetching plant");
        }
    }
}
