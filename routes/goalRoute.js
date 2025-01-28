import express from 'express';
import { GoalController } from '../controllers/goalController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, GoalController.createGoal);
router.get('/userDashboard', authMiddleware, GoalController.userGoals);
router.patch('/success/:id', authMiddleware, GoalController.successGoal);
router.patch('/modify/:id', authMiddleware, GoalController.modifyGoal);
router.delete('/delete/:id', authMiddleware, GoalController.deleteGoal);

export default router;