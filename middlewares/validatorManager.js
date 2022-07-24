import { body, validationResult } from 'express-validator';

//Esto valida que los body de express validator venga con lass validaciones correspondientes de express validator 
export const validarCampos = (req, res, next) => {
    //Encuentra los errores de validación en esta solicitud y los envuelve en un objeto con funciones útiles
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
}


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
