import jwt from 'jsonwebtoken';

export const generateToken = ( id = '' ) => {

    const duracionToken = 60 * 15 //token va a durar 15 minutos.

    try {
        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: duracionToken
        });
        
        return { token, duracionToken }

    } catch (error) {
        console.log(error);
    }
}

//! El refresh token no puede ser accedido desde javascript (frontend). Y este token, no tiene la autorización para hacer peticiones. Entonces su utilidad es para refrescar el token importante.

//! El refresh token lo que va a hacer es mandar una solicitud al servidor y el servidor comprueba si es válido. De ser válido nos va a devolver el token verdadero y con ese token (verdadero), nosotros podremos hacer la petición a la ruta protegida : /api/v1/auth/protected.

//! Y ese token verdadero solo va a vivir en la memoria del computador del cliente porque no va a estar almacenado en ninguna parte, solo en una constante en javascript y como esa constante vive en la memoria ram, es casi imposible que se pueda acceder a ella.

export const generateRefreshToken = ( id, res ) => {
    //como va a ser un token de refresh, puede durar más
    const expiresIn = 60 * 60 * 24 * 30
    //60 * 60 (segundos) * 24 (1 día) * 30 (30 días)
    try {
        const refreshToken = jwt.sign({ id }, process.env.JWT_REFRESH, { expiresIn });

        //lo guardamos a traves de una cookie porque este es solo un refresh token, por lo tanto, da lo mismo si lo roban, o si pueden hacer una petición con este refresh token, porque este no es el que valida las peticiones. 
        //Este solo sirve para generar otro token

        //Esto lo puedo VER EN LA DOCUMENTACION DE COOKI PARSER
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: !(process.env.MODO === 'developer'),
            expires: new Date( Date.now() + expiresIn * 1000) //expire desde la fecha que se crea sumado al tiempo de duración del token.
            //la gracia del expires es que si termina esta fecha, termina el token
            //Está en milisegundos por lo tanto hay que multiplicarlo por 1000
        });

    } catch (error) {
        console.log(error);
    }
}


// export const tokenVerificationErrors = {
//     "invalid signature": "La firma del JWT no es válida",
//     "jwt expired": "JWT expirado",
//     "invalid token": "token no válido",
//     "No Bearer": "Utiliza formato Bearer",
//     "jwt malformed": "JWT formato inválido"
// };