import express from 'express';
import { UserController } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', UserController.create);
router.post('/login', UserController.login);
router.get('/all', UserController.getAllUsers);
router.get('/byId/:id', UserController.getUserById);
router.delete('/delete/:id', UserController.deleteUser);
router.patch('/modify/:id', UserController.modifyUser);

export default router;