import { Router } from 'express';
import { 
    requireTokenUser, requireRefreshToken, bodyRegisterValidator, bodyLoginValidator 
} from '../middlewares/index.js';
import { 
    login, register, infoUser, refreshToken, logout 
} from '../controllers/auth.controller.js';

export const router = Router();

router.post( '/register', bodyRegisterValidator, register);
router.post('/login', bodyLoginValidator, login);

router.get( '/protected', requireTokenUser, infoUser );
router.get( '/refresh', requireRefreshToken, refreshToken );    
router.get( '/logout', logout);
