import { Router } from 'express';
import { createLink, getLinks, getLink, removeLink, updateLink } from '../controllers/link.controller.js';
import { bodyLinkValidator, paramLinkValidator, requireTokenUser } from '../middlewares/index.js';

const router = Router();

router.get('/', requireTokenUser, getLinks );
router.get('/:nanoLink', getLink)
router.post('/', requireTokenUser, bodyLinkValidator, createLink );
router.delete('/:id', requireTokenUser, paramLinkValidator, removeLink)
router.patch('/:id', requireTokenUser, paramLinkValidator, bodyLinkValidator, updateLink)

// router.route('/')
//     .get(requireTokenUser, getLinks)
//     .post(requireTokenUser, bodyLinkValidator, createLink);




export default router;