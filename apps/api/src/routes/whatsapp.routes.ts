import { Router } from 'express';
import { whatsappWebhookController } from '../controllers/whatsapp.controller.js';

const whatsappRouter = Router();

whatsappRouter.post('/webhook', whatsappWebhookController);

export default whatsappRouter;
