import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: [true, 'El correo es obligatorio'],
        trim: true,
        lowercase: true,
        index: { unique: true } 
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
});


userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) next();  

    try {
        const salt = await bcryptjs.genSalt(10);
        this.password = await bcryptjs.hash(this.password, salt);

        // next();

    } catch (error) {
        console.warn(error);
        throw new Error('Fallo el hash de password');
    }
});



userSchema.methods.comparePassword = async function(clientPassword){
    return await bcryptjs.compare(clientPassword, this.password);
}

export const User = mongoose.model('User', userSchema);