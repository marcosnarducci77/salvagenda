import { NormalizedWhatsAppInbound, UnknownRecord } from './whatsapp.types.js';

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string | null {
  return typeof value === 'string' && value.trim().length > 0 ? value : null;
}

export function normalizeWhatsAppInbound(payload: unknown): NormalizedWhatsAppInbound {
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
