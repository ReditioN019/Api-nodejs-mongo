import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema({
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

//Antes de almacenar el registro en la BD, lo hasheamos (password).
userSchema.pre('save', async function (next) {

    //* Si un password ya está hasheado, no lo volverá a hashear
    if (!this.isModified('password')) next();  //next previene de que lo que viene despues, se ejecute

    //*con this es para el acceso al schema (El this no funca con arrow function)
    //El trycatch es para gestionar si me equivoco en el código del try
    try {
        const salt = await bcryptjs.genSalt(10);//10 rondas de hasheo. Mientras más son es más seguro pero más lento.
        this.password = await bcryptjs.hash(this.password, salt);
        // next();
    } catch (error) {
        console.warn(error);
        throw new Error('Fallo el hash de password');
    }
});

//Corrobora que la password ingresada y hasheada existe en la BD
//clientPassword es la contraseña que está intentando mandar el cliente.
userSchema.methods.comparePassword = async function(clientPassword){
    return await bcryptjs.compare(clientPassword, this.password);
}

/*
!Por buenas practicas, todas las funciones tendrían que ir declaradas en el Modelo ya que es el que contiene una representación de los datos que maneja el sistema y su lógica.

!En cambio el Controlador actúa como intermediario entre el Modelo y la Vista, gestionando el flujo de información entre ellos y las transformaciones para adaptar los datos a las necesidades de cada uno.
!Que si lo puedes hacer en el controller, si se podría, pero hablando de las buenas practicas, tendría que ser siempre en el model.
*/

//users: Es el que esta en MyBackend de mongodb
export const User = mongoose.model('User', userSchema);