import { Request, Response } from 'express';

export function whatsappWebhookController(req: Request, res: Response) {
  return res.status(200).json({
    status: 'ok',
    source: 'whatsapp-webhook',
    version: 'b05500e-normalized-build',
    body: req.body
  });
}
