import jwt from 'jsonwebtoken';

export const generateToken = ( uid ) => {
    
    //* El token dura poco porque este token va a validar cualquier peticion del servidor que nosotros hagamos. Si el usuario quiere modificar su email, se le va a solicitar este token. Si el token no expirara, se lo mando al usuario y este se lo roba y podría hacer todas las solicitudes que quiera. En el caso de que llegara a robar el token, se podría decir que tiene 15 minutos para poder hackar el sitio web.
    const duracionToken = 60 * 15 //token va a durar 15 minutos.

    try {
        const token = jwt.sign({ uid }, process.env.JWT_SECRET, {
            expiresIn: duracionToken
        });

        //* Le devuelvo la duracionToken porque del lado del frontend yo voy a saber en cuanto tiempo debo hacer la revalidación del token.
        return { token, duracionToken }
    } catch (error) {
        
    }
    
}
