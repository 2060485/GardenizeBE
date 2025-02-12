import { Request, Response } from "express";
import { logger } from '../utils/logger';
import { IPlant } from "../interfaces/plant.interface";
import { PlantService } from "../services/plant.service";

export class GameController {

    public static async getPlant(req: Request, res: Response): Promise<void> {    
        try {
            const id = req.params.id;
            const plant = await PlantService.getPlant(id);
            if (plant) {
                res.json(plant);
                logger.info('GET /plants/:id - getPlant');
            } else {
                res.status(404).send('Plant not found');
                logger.info('GET /plants/:id - Plant not found');
            }
        } catch (err) {
            res.status(500).send('Error fetching plant');
            logger.error('GET /plants/:id - Error fetching plant', err);
        }
    }

    public static async getAllPlants(req: Request, res: Response): Promise<void> {
        try {
            const plants = await PlantService.getAllPlants();
            if (plants.length > 0) {
                res.json(plants);
                logger.info('GET /plants - getAllPlants');
            } else {
                res.status(404).send('No plants found');
                logger.info('GET /plants - No plants found');
            }
        } catch (err) {
            res.status(500).send('Error fetching plants');
            logger.error('GET /plants - Error fetching plants', err);
        }
    }

    public static async postPlant(req: Request, res: Response): Promise<void> {
        try {
            const newPlantData: IPlant = req.body;
            const newPlant = await PlantService.postPlant(newPlantData);
            res.status(201).json(newPlant);
            logger.info('POST /plants - postPlant');
        } catch (err) {
            res.status(500).send('Error adding new plant');
            logger.error('POST /plants - Error adding new plant', err);
        }
    }
}
