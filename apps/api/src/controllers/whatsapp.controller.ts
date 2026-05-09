import { Request, Response } from 'express';

type WhatsAppInboundPayload = unknown;

export function whatsappWebhookController(req: Request, res: Response) {
  const payload = req.body as WhatsAppInboundPayload;

  // Log básico para inspecionar o que chegou (no futuro, mandar para um logger de verdade)
  console.log('[WHATSAPP WEBHOOK] inbound payload:', JSON.stringify(payload));

  // Aqui no futuro vamos:
  // - normalizar a mensagem,
  // - identificar número, texto e tipo,
  // - chamar o orquestrador/agent.

  return res.status(200).json({
    status: 'ok',
    source: 'whatsapp-webhook',
    received_at: new Date().toISOString()
  });
}
