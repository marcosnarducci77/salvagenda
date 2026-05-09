import { randomUUID } from 'node:crypto';
import {
  Client,
  CreateClientInput,
  UpdateClientInput
} from '../schemas/client.schema.js';

const clients: Client[] = [];

export function listClients(): Client[] {
  return clients;
}

export function createClient(payload: CreateClientInput): Client {
  const client: Client = {
    id: randomUUID(),
    created_at: new Date().toISOString(),
    ...payload
  };

  clients.push(client);

  return client;
}

export function deleteClientById(id: string): boolean {
  const index = clients.findIndex((client) => client.id === id);

  if (index === -1) {
    return false;
  }

  clients.splice(index, 1);

  return true;
}

export function updateClientById(
  id: string,
  payload: UpdateClientInput
): Client | null {
  const index = clients.findIndex((client) => client.id === id);

  if (index === -1) {
    return null;
  }

  const current = clients[index];
  const updated: Client = {
    ...current,
    ...payload
  };

  clients[index] = updated;

  return updated;
}
