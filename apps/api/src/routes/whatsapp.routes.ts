import { Router } from 'express';
import { whatsappWebhookController } from '../controllers/whatsapp.controller.js';

const router = Router();

// Endpoint para receber mensagens de webhook do provider de WhatsApp
router.post('/webhook', whatsappWebhookController);

export default router;
