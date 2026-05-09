import { Request, Response } from 'express';
import { dispatchWhatsAppInbound } from '../services/whatsapp-dispatcher.js';

export function whatsappWebhookController(req: Request, res: Response) {
  const result = dispatchWhatsAppInbound(req.body, {
    currentState: 'new'
  });

  console.log(JSON.stringify({
    level: 'info',
    message: 'whatsapp_webhook_received',
    normalized: result.normalized,
    agent: result.agent,
    receivedAt: new Date().toISOString()
  }));

  return res.status(200).json({
    status: 'ok',
    source: 'whatsapp-webhook',
    version: 'dispatcher-v1',
    result
  });
}
