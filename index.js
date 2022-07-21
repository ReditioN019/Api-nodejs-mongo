import express from 'express';
import 'dotenv/config';
import './database/connectDB.js';
import { router } from './routes/auth.routes.js';

const app = express();
app.use(express.json());

app.use('/api/v1', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Personal Server in 🔥🔥🔥 http://localhost:${PORT} 🔥🔥🔥`);
})
