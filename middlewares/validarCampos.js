import { validationResult } from 'express-validator';

export const validarCampos = (req, res, next) => {
    //Encuentra los errores de validación en esta solicitud y los envuelve en un objeto con funciones útiles
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
}