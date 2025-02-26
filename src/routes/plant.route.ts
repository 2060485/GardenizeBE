import { Router } from "express";
import { PlantController } from "../controllers/plant.controller";
import { verifyToken } from "../middlewares/auth.middleware";


const plantRoutes = Router();

plantRoutes.get('/user', verifyToken, PlantController.getPlantsByUser);
plantRoutes.get('/captor',verifyToken, PlantController.getCaptorsByUser);
plantRoutes.get('/captorInfo',verifyToken, PlantController.getCaptorsInfoByUser);
plantRoutes.get('/:id', PlantController.getPlant);
plantRoutes.get('/', PlantController.getAllPlants);
plantRoutes.post('/', PlantController.postPlant);
plantRoutes.put('/:id', PlantController.updatePlant);
plantRoutes.delete('/:id', PlantController.deletePlant);


export default plantRoutes;