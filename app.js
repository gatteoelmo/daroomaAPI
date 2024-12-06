import express from 'express'
import { connectDB } from './config/db.js'
import dotenv from 'dotenv'
import userRoute from './routes/userRoute.js'
import goalRoute from './routes/goalRoute.js'

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.use('/api/users', userRoute);
app.use('/api/goals', goalRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));