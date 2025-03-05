import { Router } from "express";
import { PlantController } from "../controllers/plant.controller";
import { verifyToken } from "../middlewares/auth.middleware";
import { adminRole, allRole } from '../utils/role.util';
import { roleMiddleware } from '../middlewares/role.middleware';

const plantRoutes = Router();
const plantController = new PlantController();

plantRoutes.get('/user', verifyToken, plantController.getPlantsByUser);
plantRoutes.get('/captor',verifyToken, plantController.getCaptorsByUser);
plantRoutes.get('/captorInfo',verifyToken, plantController.getCaptorsInfoByUser);
plantRoutes.get('/:id',verifyToken, plantController.getPlant);
plantRoutes.get('/',verifyToken,roleMiddleware(adminRole), plantController.getAllPlants);
plantRoutes.post('/',verifyToken, plantController.postPlant);
plantRoutes.put('/:id',verifyToken, plantController.updatePlant);
plantRoutes.delete('/:id',verifyToken, plantController.deletePlant);


export default plantRoutes;