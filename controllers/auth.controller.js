import { User } from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

export const register = async ( req, res ) => {

    const { email, password } = req.body;

    //!VALIDACION:
    //Restringe usuarios duplicados (email)
    const existeUsuario = await User.findOne({ email });

    if (existeUsuario) {
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({ msg: error.message });
    }

    try {//Guardar un nuevo usuario
        const user = new User({ email, password }); //creo una nueva instancia de veterinario. (la que traigo del modelo)
        const nuevoUsuario = await user.save();//save: creo el nuevo registro

        //JWT, token 

        return res.status(201).json({ ok: true, nuevoUsuario });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error de servidor' });
    }
}


export const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        //Verifica si el email existe
        if (!user) {
            return res.status(403).json({ msg: 'Credenciales incorrectas'});
        }

        if( !await user.comparePassword( password ) ){
            return res.status(403).json({ msg: 'Credenciales incorrectas'});
        }

        //Generar TOKEN 
        const { token, duracionToken } = generateToken( user._id );

        return res.status(200).json({ token, duracionToken });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error de servidor' });
    }
}


export const infoUser = async(req, res) => {
    
    try {

        //lean(): al hacer la busqueda trae un objeto enriquecido con mongoose para que tenga todos los metodos dsponibles, pero con lean() se devuelve como un objeto simple. El codigo es más rapido
        const user = await User.findById( req.uid ).lean();
        return res.json({ email: user.email })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Error de servidor' });
    }
} 