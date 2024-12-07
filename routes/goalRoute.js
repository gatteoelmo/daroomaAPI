import express from 'express';
import { GoalController } from '../controllers/goalController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, GoalController.createGoal);
router.get('/userDashboard', authMiddleware, GoalController.userGoals);
router.patch('/success/:id', GoalController.successGoal);
router.patch('/modify/:id', GoalController.modifyGoal);

export default router;