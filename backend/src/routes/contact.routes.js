import { Router } from 'express';
import { createContactMessage } from '../controllers/contact.controller.js';
import { validateContact } from '../middleware/validate-contact.js';

const router = Router();

router.post('/', validateContact, createContactMessage);

export default router;
