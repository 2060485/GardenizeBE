import { Router } from "express";
import { PlantController } from "../controllers/plant.controller";
import { verifyToken } from "../middlewares/auth.middleware";
import { adminRole, allRole } from '../utils/role.util';
import { roleMiddleware } from '../middlewares/role.middleware';

const plantRoutes = Router();

plantRoutes.get('/user', verifyToken, PlantController.getPlantsByUser);
plantRoutes.get('/captor',verifyToken, PlantController.getCaptorsByUser);
plantRoutes.get('/captorInfo',verifyToken, PlantController.getCaptorsInfoByUser);
plantRoutes.get('/:id',verifyToken, PlantController.getPlant);
plantRoutes.get('/',verifyToken,roleMiddleware(adminRole), PlantController.getAllPlants);
plantRoutes.post('/',verifyToken, PlantController.postPlant);
plantRoutes.put('/:id',verifyToken, PlantController.updatePlant);
plantRoutes.delete('/:id',verifyToken, PlantController.deletePlant);


export default plantRoutes;