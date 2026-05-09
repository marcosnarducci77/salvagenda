import { AgentContext, AgentResult, NormalizedWhatsAppInbound } from './whatsapp.types.js';

function includesAny(text: string, terms: string[]): boolean {
  const lower = text.toLowerCase();
  return terms.some((term) => lower.includes(term));
}

export function runSchedulerAgent(
  inbound: NormalizedWhatsAppInbound,
  context: AgentContext
): AgentResult {
  const text = inbound.text?.trim() ?? '';

  if (!text) {
    return {
      handled: false,
      intent: 'empty_message',
      replyText: null,
      nextState: context.currentState,
      shouldEscalate: false,
      metadata: { reason: 'no_text_content' }
    };
  }

  if (includesAny(text, ['agendar', 'marcar', 'horário', 'horario', 'consulta', 'corte'])) {
    return {
      handled: true,
      intent: 'schedule_request',
      replyText: 'Perfeito. Para eu te ajudar a agendar, me diga qual serviço você quer marcar.',
      nextState: 'awaiting_service_selection',
      shouldEscalate: false,
      metadata: { matchedBy: 'schedule_keywords' }
    };
  }

  if (includesAny(text, ['atendente', 'humano', 'pessoa'])) {
    return {
      handled: true,
      intent: 'human_handoff_request',
      replyText: 'Certo. Vou direcionar seu atendimento para uma pessoa da equipe.',
      nextState: 'human_handoff',
      shouldEscalate: true,
      metadata: { matchedBy: 'handoff_keywords' }
    };
  }

  return {
    handled: true,
    intent: 'fallback',
    replyText: 'Posso te ajudar com agendamento. Escreva, por exemplo: quero agendar um corte amanhã.',
    nextState: context.currentState,
    shouldEscalate: false,
    metadata: { matchedBy: 'fallback' }
  };
}
