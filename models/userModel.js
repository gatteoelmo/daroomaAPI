import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        xp: {
            type: Number,
            default: 0,
        },
        level: {
            type: Number,
            default: 1,
        },
        badges: {
            type: [String],
            default: [],
        },
        
    }
);

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Se usi frequentemente metodi come findByIdAndUpdate, 
// il middleware pre('findOneAndUpdate') è la soluzione più comoda ed elegante.
// 
// UserSchema.pre('findOneAndUpdate', async function (next) {
//     const update = this.getUpdate();
//     if (update.password) {
//       const hashedPassword = await bcrypt.hash(update.password, 10);
//       this.setUpdate({ ...update, password: hashedPassword });
//     }  
//     next();
// });

export default mongoose.model("User", UserSchema);