# SalvAgenda

## Objetivo
SaaS de agendamento para operações de serviço, com foco em agendamento, lembretes e histórico.

## Stack oficial
- Frontend: Next.js
- Backend: Node.js + Express + TypeScript
- Banco/Auth: Supabase
- Monorepo com pnpm workspace

## Estrutura oficial
- apps/web
- apps/api
- infra/supabase

## Foco do MVP
- Agendamento
- Lembretes
- Histórico de agendamento

## Entidades principais
- tenants
- users
- tenant_users
- professionals
- clients
- services
- appointments
- reminders
- appointment_history

## Regras de arquitetura
- Sempre planejar antes de implementar mudanças grandes
- Controllers finos
- Regra de negócio em services
- Validação com Zod
- Recursos REST em plural
- snake_case no banco
- Multi-tenant com tenant_id
- RLS no banco, papéis finos podem vir depois

## Backend atual
- apps/api com Express + TypeScript
- endpoint GET /health funcionando
- scripts dev/build/start configurados
- tsconfig criado
- src/app.ts e src/server.ts criados

## Fora de escopo agora
- Dashboard analítico avançado
- Integrações externas complexas
- Automação de browser
- Playwright
- Permissões avançadas por role no banco
- Multi-tenant switching no frontend

## Como trabalhar neste projeto
1. Ler o repositório antes de sugerir mudanças
2. Propor plano antes de implementar mudanças com múltiplos arquivos
3. Trabalhar em etapas pequenas
4. Não avançar além do escopo pedido
5. Priorizar backend e fluxo central antes de polimento
