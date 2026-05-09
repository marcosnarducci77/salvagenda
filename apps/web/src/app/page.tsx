'use client';

import { FormEvent, useEffect, useState } from 'react';

type Client = {
  id: string;
  full_name: string;
  phone: string;
  email?: string;
  notes?: string;
  tenant_id: string;
  created_at: string;
};

type CreateClientPayload = {
  full_name: string;
  phone: string;
  email: string;
  notes: string;
  tenant_id: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333';

const initialForm: CreateClientPayload = {
  full_name: '',
  phone: '',
  email: '',
  notes: '',
  tenant_id: 'tenant-demo'
};

export default function HomePage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [form, setForm] = useState<CreateClientPayload>(initialForm);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function loadClients() {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(`${API_URL}/clients`, {
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error('Falha ao buscar clients.');
      }

      const json = await response.json();
      setClients(json.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro inesperado ao carregar clients.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadClients();
  }, []);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${API_URL}/clients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          full_name: form.full_name,
          phone: form.phone,
          email: form.email || undefined,
          notes: form.notes || undefined,
          tenant_id: form.tenant_id
        })
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json?.error?.message || 'Falha ao criar client.');
      }

      setSuccess('Client criado com sucesso.');
      setForm(initialForm);
      await loadClients();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro inesperado ao criar client.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      setDeletingId(id);
      setError('');
      setSuccess('');

      const response = await fetch(`${API_URL}/clients/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Falha ao excluir client.');
      }

      setSuccess('Client excluido com sucesso.');
      await loadClients();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro inesperado ao excluir client.');
    } finally {
      setDeletingId('');
    }
  }

  return (
    <main
      style={{
        maxWidth: 960,
        margin: '0 auto',
        padding: '40px 20px',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <h1 style={{ marginBottom: 8 }}>SalvAgenda Web</h1>
      <p style={{ marginBottom: 32, color: '#555' }}>
        Tela minima para testar integracao com a API de clients.
      </p>

      <section
        style={{
          marginBottom: 40,
          padding: 24,
          border: '1px solid #ddd',
          borderRadius: 12
        }}
      >
        <h2 style={{ marginBottom: 16 }}>Novo client</h2>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
          <input
            name="full_name"
            placeholder="Nome completo"
            value={form.full_name}
            onChange={handleChange}
            required
            style={{ padding: 12, borderRadius: 8, border: '1px solid #ccc' }}
          />

          <input
            name="phone"
            placeholder="Telefone"
            value={form.phone}
            onChange={handleChange}
            required
            style={{ padding: 12, borderRadius: 8, border: '1px solid #ccc' }}
          />

          <input
            name="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            style={{ padding: 12, borderRadius: 8, border: '1px solid #ccc' }}
          />

          <textarea
            name="notes"
            placeholder="Observacoes"
            value={form.notes}
            onChange={handleChange}
            rows={4}
            style={{
              padding: 12,
              borderRadius: 8,
              border: '1px solid #ccc',
              resize: 'vertical'
            }}
          />

          <input
            name="tenant_id"
            placeholder="Tenant ID"
            value={form.tenant_id}
            onChange={handleChange}
            required
            style={{ padding: 12, borderRadius: 8, border: '1px solid #ccc' }}
          />

          <button
            type="submit"
            disabled={submitting}
            style={{
              padding: '12px 16px',
              borderRadius: 8,
              border: 'none',
              background: '#111',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            {submitting ? 'Criando...' : 'Criar client'}
          </button>
        </form>

        {success ? (
          <p style={{ marginTop: 16, color: 'green' }}>{success}</p>
        ) : null}

        {error ? (
          <p style={{ marginTop: 16, color: 'crimson' }}>{error}</p>
        ) : null}
      </section>

      <section
        style={{
          padding: 24,
          border: '1px solid #ddd',
          borderRadius: 12
        }}
      >
        <h2 style={{ marginBottom: 16 }}>Clients</h2>

        {loading ? <p>Carregando...</p> : null}

        {!loading && clients.length === 0 ? (
          <p>Nenhum client cadastrado.</p>
        ) : null}

        {!loading && clients.length > 0 ? (
          <div style={{ display: 'grid', gap: 12 }}>
            {clients.map((client) => (
              <article
                key={client.id}
                style={{
                  padding: 16,
                  border: '1px solid #333',
                  borderRadius: 10,
                  background: '#111',
                  color: '#fff'
                }}
              >
                <h3 style={{ marginBottom: 8 }}>{client.full_name}</h3>
                <p><strong>Telefone:</strong> {client.phone}</p>
                <p><strong>E-mail:</strong> {client.email || '-'}</p>
                <p><strong>Tenant:</strong> {client.tenant_id}</p>
                <p><strong>Observacoes:</strong> {client.notes || '-'}</p>
                <p><strong>ID:</strong> {client.id}</p>
                <p><strong>Criado em:</strong> {new Date(client.created_at).toLocaleString('pt-BR')}</p>

                <button
                  type="button"
                  onClick={() => handleDelete(client.id)}
                  disabled={deletingId === client.id}
                  style={{
                    marginTop: 12,
                    padding: '10px 14px',
                    borderRadius: 8,
                    border: '1px solid #444',
                    background: '#b42318',
                    color: '#fff',
                    cursor: 'pointer'
                  }}
                >
                  {deletingId === client.id ? 'Excluindo...' : 'Excluir'}
                </button>
              </article>
            ))}
          </div>
        ) : null}
      </section>
    </main>
  );
}
