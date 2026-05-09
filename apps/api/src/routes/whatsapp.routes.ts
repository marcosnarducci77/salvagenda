import { Router } from 'express';
import { whatsappWebhookController } from '../controllers/whatsapp.controller.js';

const whatsappRouter = Router();

whatsappRouter.post('/whatsapp/webhook', whatsappWebhookController);

export { whatsappRouter };
