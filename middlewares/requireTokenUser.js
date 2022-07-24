import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const requireTokenUser = async (req, res, next) => {

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
            token = req.headers.authorization.split(' ')[1];

            const { id } = jwt.verify(token, process.env.JWT_SECRET);
            
            req.id = await User.findById(id).select( "-password" );

            return next();

        } catch (err) {
            return res.status(401).json({ error: "Token inválido"});
        }
    }

    if(!token) res.status(403).json({ msg: 'Token no válido o inexistente' }); 
    
    next();
}
