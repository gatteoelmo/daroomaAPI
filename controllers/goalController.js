import Goal from "../models/goalModel.js";
import User from "../models/userModel.js";

export const GoalController = {
    createGoal: async (req, res) => {
        const { user, title, description, difficulty, deadline } = req.body;
        const userExists = await User.findById(user);
        // console.log(user);

        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }
      
        try {
            let xp;
            switch (difficulty) {
                case 'easy':
                  xp = 10;
                  break;
                case 'medium':
                  xp = 30;
                  break;
                case 'hard':
                  xp = 60;
                  break;
                default:
                  xp = 5;
            };

            const goal = new Goal({user, title, description, difficulty, xp, deadline});
            await goal.save();
            res.status(201).json(goal);
        }  catch (error) {
            res.status(500).json({ message: 'Errore del server' });
        }
    },

    getAllGoals: async (req, res) => {
        try {
            const goals = await Goal.find();
            res.status(200).json(goals);
        } catch (error) {
            res.status(500).json({ message: 'Errore del server' });
        }
    },

    modifyGoal: async (req, res) => {
        try {
            const { id } = req.params;
            const { title, description, difficulty, deadline } = req.body;
            const goal = await Goal.findByIdAndUpdate(id, { title, description, difficulty, deadline }, { new: true });
            res.status(200).json(goal);
        } catch (error) {
            res.status(500).json({ message: 'Errore del server' });
        }
    },

    userGoals: async (req, res) => {
        try {
            const user = req.params.id;
            const goals = await Goal.find({ user });
            console.log(user);
            res.status(200).json(goals);
        } catch (error) {
          res.status(500).json({ message: 'Errore del server' });
        }
      },

    successGoal: async (req, res) => {
        try {
        const goal = await Goal.findById(req.params.id);
        if (!goal) return res.status(404).json({ message: 'Goal not found' });

        if (goal.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        goal.completed = true;  
        await goal.save();
        res.status(200).json({ message: 'Goal completed successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Errore del server' });
        }
    },
}