import { Router } from "express";
import { GameController } from "../controllers/plant.controller";


const plantRoutes = Router();

plantRoutes.get('/:id', GameController.getPlant);
plantRoutes.get('/', GameController.getAllPlants);
plantRoutes.post('/', GameController.postPlant);
plantRoutes.put('/:id', GameController.updatePlant);
plantRoutes.delete('/:id', GameController.deletePlant);

export default plantRoutes;