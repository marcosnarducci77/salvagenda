export type UnknownRecord = Record<string, unknown>;

export type NormalizedWhatsAppInbound = {
  channel: 'whatsapp';
  provider: string;
  from: string | null;
  text: string | null;
  messageId: string | null;
  timestamp: string;
  type: string;
  raw: unknown;
};

export type ConversationState =
  | 'new'
  | 'awaiting_service_selection'
  | 'awaiting_date'
  | 'awaiting_confirmation'
  | 'human_handoff';

export type AgentContext = {
  conversationId: string | null;
  currentState: ConversationState;
  customerName?: string | null;
};

export type AgentResult = {
  handled: boolean;
  intent: string;
  replyText: string | null;
  nextState: ConversationState;
  shouldEscalate: boolean;
  metadata?: Record<string, unknown>;
};

export type WhatsAppDispatcherResult = {
  normalized: NormalizedWhatsAppInbound;
  agent: AgentResult;
};
