import mongoose from 'mongoose';

export const connectDB = async() => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        console.log("Base de datos online 👌");

        // const url = `${db.connection.host}:${db.connection.port}`;
        // console.log(`MongoDB conectado en: ${url}`);

    } catch (error) {
        console.warn(`Error al conectar a MONGODB: ${error} ❌`);
        // throw new Error("Error a la hora de levantar o iniciar la base de datos");
        process.exit(1); //Esta opción obliga a cerrar
    }
};