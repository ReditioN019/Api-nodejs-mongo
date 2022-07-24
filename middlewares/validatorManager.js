import { body, validationResult, param } from 'express-validator';
import axios from 'axios';

//Esto valida que los body de express validator venga con lass validaciones correspondientes de express validator 
export const validarCampos = (req, res, next) => {
    //Encuentra los errores de validación en esta solicitud y los envuelve en un objeto con funciones útiles
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
}

export const paramLinkValidator = [
    param('id', 'Formato no válido (express-validatos')
        .trim()
        .notEmpty()
        .escape()
        ,validarCampos
];

export const bodyLinkValidator = [
    body('longLink', 'Formato Link Incorrecto').trim()
        .notEmpty() // para que le mande el cuerpo
        .custom( async value => {
            try {
                //Si el usuario no envía el https:// antes del link, se le agrega
                if(!value.startsWith('https://')){
                    value = 'https://' + value
                }
                //! EL problema es que si por ejemplo pone htt::, le agrega el https y queda mal SOLUCIONAR

                await axios.get(value);
                return value;
            } catch (error) {
                // console.log(error);
                throw new Error('Not Found longLink 404');
            }
        })
    ,validarCampos
];


export const bodyRegisterValidator = [
    //En el body recibo la propiedad email. isEmail(): comprueba que es email
    body('email', 'Formato de email incorrecto')
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', 'La contraseña debe tener mínimo 6 caracteres')
        .trim()
        .isLength({ min: 6 }),
    validarCampos, //este es el que realmente hace la validacion importante
];

export const bodyLoginValidator = [
    body('email', 'Formato de email incorrecto')
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', 'La contraseña debe tener mínimo 6 caracteres')
        .trim()
        .isLength({ min: 6 }),
    validarCampos
]
