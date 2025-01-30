import Goal from "../models/goalModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";

export const GoalController = {
    createGoal: async (req, res) => {
        const { title, description, difficulty, deadline } = req.body;
      
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

            const goal = new Goal({user: req.user.id, title, description, difficulty, xp, deadline});
            await goal.save();
            res.status(201).json(goal);
        }  catch (error) {
            res.status(500).json({ message: 'Sorry but we have an intern problem man' });
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
            const goals = await Goal.find({ user: req.user.id });
            res.status(200).json(goals);
          } catch (error) {
            res.status(500).json({ message: 'Errore del server' });
          }
      },

 successGoal : async (req, res) => {
  try {
    console.log(`Request to complete goal. User ID: ${req.user.id}, Goal ID: ${req.params.id}`);

    // Validazione dell'ID del goal
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      console.error("Invalid goal ID format");
      return res.status(400).json({ message: 'Invalid goal ID format' });
    }

    // Trova il goal
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      console.error("Goal not found");
      return res.status(404).json({ message: 'Goal not found' });
    }

    // Verifica l'ownership
    if (goal.user.toString() !== req.user.id) {
      console.error(`Unauthorized access. Goal belongs to: ${goal.user}, User trying: ${req.user.id}`);
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Trova l'utente
    const user = await User.findById(req.user.id);
    if (!user) {
      console.error("User not found");
      return res.status(404).json({ message: 'User not found' });
    }

    // Alterna stato completato e aggiorna XP
    goal.completed = !goal.completed;
    const xpChange = goal.xp || 10;

    if (goal.completed) {
      user.xp += xpChange;
      console.log(`Goal completed. Added ${xpChange} XP to user.`);
    } else {
      user.xp -= xpChange;
      console.log(`Goal marked as incomplete. Removed ${xpChange} XP from user.`);
    }

    // Calcolo livello basato su XP
    const xpPerLevel = 100; // XP richiesto per livello
    const newLevel = Math.floor(user.xp / xpPerLevel) + 1; // Livello basato su XP attuale

    if (newLevel !== user.level) {
      console.log(`User level changed from ${user.level} to ${newLevel}`);
      user.level = newLevel;
    }

    // Salva le modifiche
    await goal.save();
    await user.save();

    // Risposta di successo
    res.status(200).json({
      message: 'Goal completion toggled successfully',
      goal,
      user: {
        id: user.id,
        xp: user.xp,
        level: user.level,
      },
    });
  } catch (error) {
    console.error("Server error:", error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
},

      

    deleteGoal: async (req, res) => {
        try {
            const goal = await Goal.findByIdAndDelete(req.params.id);
            if (!goal) return res.status(404).json({ message: 'Goal not found' });
            res.status(200).json({ message: 'Goal deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Errore del server' });
        }
    }
}