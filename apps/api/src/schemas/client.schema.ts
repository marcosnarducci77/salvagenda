import { z } from 'zod';

export const createClientSchema = z.object({
  full_name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email().optional(),
  notes: z.string().optional(),
  tenant_id: z.string().min(1)
});

export const updateClientSchema = createClientSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: 'At least one field must be provided' }
);

export type CreateClientInput = z.infer<typeof createClientSchema>;
export type UpdateClientInput = z.infer<typeof updateClientSchema>;

export type Client = {
  id: string;
  created_at: string;
  full_name: string;
  phone: string;
  email?: string;
  notes?: string;
  tenant_id: string;
};
