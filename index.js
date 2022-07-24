import cookieParser from "cookie-parser";
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './database/connectDB.js';
import { router } from './routes/auth.routes.js';
import linkRouter from './routes/link.routes.js';
import redirectRouter from './routes/redirect.routes.js';
 

const app = express();

//En el array indico cuales son todos los dominios que quiero aceptar en el backend
//En este caso el origin sería el dominio raiZ
const whiteList = [process.env.ORIGIN1]

//origin; es desde donde se está haciendo la solicitud.
app.use(cors({
    origin: function(origin, callback){
        if(whiteList.includes(origin)){
            return callback(null, origin);
        }
        return this.callback("Error de cors origin: "+ origin + " no autorizado");
    }
}))

app.use(express.json());
app.use(cookieParser());
connectDB();

//ejemplo backend redirect (optional)
app.use('/', redirectRouter);

app.use('/api/v1/auth', router);
app.use('/api/v1/links', linkRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Personal Server in 🔥🔥🔥 http://localhost:${PORT} 🔥🔥🔥`);
})
