import { Router } from "express";
import { GameController } from "../controllers/plant.controller";


const plantRoutes = Router();

plantRoutes.get('/:id', GameController.getPlant);
plantRoutes.get('/', GameController.getAllPlants);
plantRoutes.post('/', GameController.postPlant);

export default plantRoutes;