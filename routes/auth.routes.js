import { Router } from 'express';
import { body } from 'express-validator';
import { login, register, infoUser } from '../controllers/auth.controller.js';
import { validarCampos, validaTokenUser } from '../middlewares/index.js';

export const router = Router();

router.post( '/register', [
    //En el body recibo la propiedad email. isEmail(): comprueba que es email
    body('email', 'Formato de email incorrecto').trim().isEmail().normalizeEmail(), 
    body('password', 'La contraseña debe tener mínimo 6 caracteres')
        .trim().isLength({ min: 6}),
    validarCampos,
], register);

router.post('/login', [
    body('email', 'Formato de email incorrecto')
        .trim().isEmail().normalizeEmail(), 
    body('password', 'La contraseña debe tener mínimo 6 caracteres')
        .trim().isLength({ min: 6}),
], login);

router.get( '/protected', validaTokenUser, infoUser );
