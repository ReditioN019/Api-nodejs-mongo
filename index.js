import cookieParser from "cookie-parser";
import express from 'express';
import 'dotenv/config';
import { connectDB } from './database/connectDB.js';
import { router } from './routes/auth.routes.js';
 

const app = express();
app.use(express.json());
app.use(cookieParser());
connectDB();

app.use('/api/v1/auth', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Personal Server in 🔥🔥🔥 http://localhost:${PORT} 🔥🔥🔥`);
})
