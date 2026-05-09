import { Request, Response } from 'express';

type UnknownRecord = Record<string, unknown>;

type NormalizedWhatsAppInbound = {
  channel: 'whatsapp';
  provider: string;
  from: string | null;
  text: string | null;
  messageId: string | null;
  timestamp: string;
  type: string;
  raw: unknown;
};

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string | null {
  return typeof value === 'string' && value.trim().length > 0 ? value : null;
}

function normalizeWhatsAppInbound(payload: unknown): NormalizedWhatsAppInbound {
  const now = new Date().toISOString();

  if (!isRecord(payload)) {
    return {
      channel: 'whatsapp',
      provider: 'unknown',
      from: null,
      text: null,
      messageId: null,
      timestamp: now,
      type: 'unknown',
      raw: payload
    };
  }

  const text =
    asString(payload.text) ??
    asString(payload.message) ??
    asString(payload.body) ??
    asString(payload.content) ??
    null;

  const from =
    asString(payload.from) ??
    asString(payload.phone) ??
    asString(payload.sender) ??
    asString(payload.author) ??
    null;

  const messageId =
    asString(payload.messageId) ??
    asString(payload.message_id) ??
    asString(payload.id) ??
    null;

  const type =
    asString(payload.type) ??
    (text ? 'text' : 'unknown');

  const timestamp =
    asString(payload.timestamp) ??
    now;

  const provider =
    asString(payload.provider) ??
    'unknown';

  return {
    channel: 'whatsapp',
    provider,
    from,
    text,
    messageId,
    timestamp,
    type,
    raw: payload
  };
}

export function whatsappWebhookController(req: Request, res: Response) {
  const normalized = normalizeWhatsAppInbound(req.body);

  console.log(JSON.stringify({
    level: 'info',
    message: 'whatsapp_webhook_received',
    event: normalized,
    receivedAt: new Date().toISOString()
  }));

  return res.status(200).json({
    status: 'ok',
    source: 'whatsapp-webhook',
    version: 'normalized-v1',
    normalized
  });
}
