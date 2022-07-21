import { Router } from 'express';
import { login, register } from '../controllers/auth.controller.js';
import { body } from 'express-validator';
import { validarCampos } from '../middlewares/validarCampos.js';

export const router = Router();

router.post( '/register', [
    //En el body recibo la propiedad email. isEmail(): comprueba que es email
    body('email', 'Formato de email incorrecto').trim().isEmail().normalizeEmail(), 
    body('password', 'La contraseña debe tener mínimo 6 caracteres')
        .trim().isLength({ min: 6}),
    body('password', 'Formato password incorrecta')
        .custom((value, {req}) => {
            //toma el value (en este caso el password) y obtiene el required y saca el repassword para validarlo 
            if(value !== req.body.repassword){
                //En realidad esto debería hacerlo el frontend, no el backend 
                throw new Error('Las contraseñas no coinciden');
            }
            return value;
        }),
        validarCampos
], register);

router.post('/login', [
    body('email', 'Formato de email incorrecto')
        .trim().isEmail().normalizeEmail(), 
    body('password', 'La contraseña debe tener mínimo 6 caracteres')
        .trim().isLength({ min: 6}),
], login);
