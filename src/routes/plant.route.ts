import { Router } from "express";
import { PlantController } from "../controllers/plant.controller";


const plantRoutes = Router();

plantRoutes.get('/:id', PlantController.getPlant);
plantRoutes.get('/', PlantController.getAllPlants);
plantRoutes.get('/user/:id', PlantController.getPlantsByUser);
plantRoutes.post('/', PlantController.postPlant);
plantRoutes.put('/:id', PlantController.updatePlant);
plantRoutes.delete('/:id', PlantController.deletePlant);


export default plantRoutes;