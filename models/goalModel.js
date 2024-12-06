import mongoose from "mongoose";

const goalSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        title: { 
            type: String, 
            required: true 
        },
        description: { 
            type: String 
        },
        difficulty: { 
            type: String, 
            enum: ['easy', 'medium', 'hard'], 
            required: true 
        },
        xp: { 
            type: Number, 
            required: true 
        },
        completed: { 
            type: Boolean, 
            default: false 
        },
        deadline: { 
            type: Date 
        },
    }, 
    { timestamps: true }
);

export default mongoose.model("Goal", goalSchema);