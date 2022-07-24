import { Router } from 'express';
import { redirectLink } from '../controllers/redirect.controller.js';

const router = Router();

//El nanolink es el que hace la busqueda en la BD o hacer el redireccionamiento
router.get('/:nanoLink', redirectLink);



export default router;