import { normalizeWhatsAppInbound } from './whatsapp-normalizer.js';
import { runSchedulerAgent } from './scheduler-agent.js';
import {
  AgentContext,
  WhatsAppDispatcherResult
} from './whatsapp.types.js';

export function dispatchWhatsAppInbound(
  payload: unknown,
  context?: Partial<AgentContext>
): WhatsAppDispatcherResult {
  const normalized = normalizeWhatsAppInbound(payload);

  const resolvedContext: AgentContext = {
    conversationId: normalized.from,
    currentState: context?.currentState ?? 'new',
    customerName: context?.customerName ?? null
  };

  const agent = runSchedulerAgent(normalized, resolvedContext);

  return {
    normalized,
    agent
  };
}
