import jwt from 'jsonwebtoken';

export const requireRefreshToken = (req, res, next) => {
    try {
        //lee la cookie y la almacena en la const
        const refreshTokenCookie = req.cookies.refreshToken;

        if (!refreshTokenCookie) throw new Error("No existe el token");

        //Verificamos el refresh token con la clave secreta y obtenemos el id del cliente
        const { id } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH); 

        req.id = id;
        
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({error: 'Error en refresh token'})
    }
}
