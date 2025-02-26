import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { adminRole, allRole } from '../utils/role.util';
import { roleMiddleware } from '../middlewares/role.middleware';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();
const userController = new UserController();


router.put('/deletePi',verifyToken, userController.removePiFromUser);
router.get('/settings', verifyToken, userController.getUserSettings);
router.put('/settings', verifyToken, userController.updateUserSettings);
router.put('/pi',verifyToken, userController.addPiToUser);
router.get('/pi',verifyToken, userController.getUserPis);
router.get('/users', verifyToken, roleMiddleware(allRole), userController.getAllUsers);
router.post('/users', userController.createNewUser);
router.put('/users/:id', verifyToken, roleMiddleware(adminRole), userController.updateUser);
router.delete('/users/:id', verifyToken, roleMiddleware(adminRole), userController.deleteUser);

export default router;
