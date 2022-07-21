import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: [true, 'El correo es obligatorio'], 
        trim: true,
        lowercase: true,
        index: { unique: true } //en caso de ser millones de datos, la indexación sirve para hacer las busquedas mucho mas rápidas
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
});

//users: Es el que esta en MyBackend de mongodb
export const User = model('users', userSchema);