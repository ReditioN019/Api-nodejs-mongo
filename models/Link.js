import mongoose from 'mongoose';
const { Schema, model } = mongoose;

//Este esquema tiene que hacer una referencia al usuario porque cada vez que se cree una nueva url o un link tenemos que decirle quien fue la persona que lo creo, cosa que cuando queramos traer el link de esa persona, ya tenemos el id del cliente, nos traemos todos los links relacionados a el.
const linkSchema = new Schema({
    //ling largo
    longLink: {
        type: String,
        required: true,
        trim: true,
    },
    //link corto que generamos
    nanoLink: {
        type: String,
        required: true,
        trim: true,
        unique: true //debe ser único pq en nuestra app se va a registrar harta gente, entonce si se repite el nanoLink, no sabriamos a cual URL redirigir. Por eso es mejor mostrar un error SI ES QUE estos link pequeños se llegaran a repetir.
    },
    uid: { //esto se va a traer el objeto de un usuario de un modelo que nosotros ya tengamos establecido y podamos hacer ese tipo de relacion (referencia)
        type: Schema.Types.ObjectId, //este tipo va a ser igual a lo que nosotros generamos como ID cuando generamos este schema (linkShema)
        ref: 'User', //referencia al modelo User. Debo poner el mismo nombre que está en el export del modelo User. El que esta en ''
        required: true
    }

});


export const Link = model('Link', linkSchema);