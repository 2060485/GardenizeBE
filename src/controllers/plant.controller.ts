import { Request, Response } from "express";
import { logger } from '../utils/logger';
import { IPlant } from "../interfaces/plant.interface";
import { PlantService } from "../services/plant.service";

export class PlantController {

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
            newPlantData.captorID= newPlantData.captorID.valueOf()
            const newPlant = await PlantService.postPlant(newPlantData);
            res.status(201).json(newPlant);
            logger.info('POST /plants - postPlant');
        } catch (err) {
            res.status(500).send('Error adding new plant');
            logger.error('POST /plants - Error adding new plant', err);
        }
    }

    public static async updatePlant(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const updateData: Partial<IPlant> = req.body;
    
            const updatedPlant = await PlantService.updatePlant(id, updateData);
            if (updatedPlant) {
                res.json(updatedPlant);
                logger.info('PUT /plants/:id - updatePlant');
            } else {
                res.status(404).send('Plant not found for update');
                logger.info('PUT /plants/:id - Plant not found for update');
            }
        } catch (err) {
            res.status(500).send('Error updating plant');
            logger.error('PUT /plants/:id - Error updating plant', err);
        }
    }
    
    public static async deletePlant(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const deletedPlant = await PlantService.deletePlant(id);
            if (deletedPlant) {
                res.status(200).json(deletedPlant);
                logger.info('DELETE /plants/:id - deletePlant');
            } else {
                res.status(404).send('Plant not found for deletion');
                logger.info('DELETE /plants/:id - Plant not found for deletion');
            }
        } catch (err) {
            res.status(500).send('Error deleting plant');
            logger.error('DELETE /plants/:id - Error deleting plant', err);
        }
    }

    public static async getPlantsByUser(req: Request, res: Response): Promise<void> {
        try {
            const userID = req.body.userID;
            const plants = await PlantService.getPlantsByUserID(userID);
            if (plants.length > 0) {
                res.json(plants);
                logger.info('GET /plants/user/:userID - getPlantsByUserID');
            } else {
                res.status(404).send('No plants found for this user');
                logger.info('GET /plants/user/:userID - No plants found');
            }
        } catch (err) {
            res.status(500).send('Error fetching plants by user');
            logger.error('GET /plants/user/:userID - Error fetching plants by user', err);
        }
    }
    
    
}
