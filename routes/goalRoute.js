import express from 'express';
import { GoalController } from '../controllers/goalController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', GoalController.createGoal);
router.get('/', GoalController.getAllGoals);
router.get('/userHome/:id', GoalController.userGoals);
router.patch('/success/:id', GoalController.successGoal);
router.patch('/modify/:id', GoalController.modifyGoal);

export default router;