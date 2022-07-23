import jwt from 'jsonwebtoken';

export const validaTokenUser = (req, res, next) => {

    try {
        let token = req.headers.authorization;

        if(!token) throw new Error('No existe el token en el header. Usar Bearer');
        
        //separo el bearer + token y devuelve la posicion 1 que es el token
        token = token.split(' ')[1];

        //El uid sería el id del usuario
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid;  
        next();

        
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: error.message });
    }
}
