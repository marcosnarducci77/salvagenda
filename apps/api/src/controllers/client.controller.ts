import { NextFunction, Request, Response } from 'express';
import {
  createClient,
  deleteClientById,
  listClients,
  updateClientById
} from '../services/client.service.js';
import {
  createClientSchema,
  updateClientSchema
} from '../schemas/client.schema.js';

export function listClientsController(_req: Request, res: Response) {
  const clients = listClients();

  res.status(200).json({ data: clients });
}

export function createClientController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = createClientSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: {
          code: 'INVALID_CLIENT_PAYLOAD',
          message: 'Invalid client payload',
          details: result.error.flatten()
        }
      });
    }

    const client = createClient(result.data);

    return res.status(201).json({ data: client });
  } catch (error) {
    return next(error);
  }
}

export function patchClientController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = updateClientSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: {
          code: 'INVALID_CLIENT_UPDATE_PAYLOAD',
          message: 'Invalid client update payload',
          details: result.error.flatten()
        }
      });
    }

    const clientId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const client = updateClientById(clientId, result.data);

    if (!client) {
      return res.status(404).json({
        error: {
          code: 'CLIENT_NOT_FOUND',
          message: 'Client not found'
        }
      });
    }

    return res.status(200).json({ data: client });
  } catch (error) {
    return next(error);
  }
}

export function deleteClientController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const clientId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const deleted = deleteClientById(clientId);

    if (!deleted) {
      return res.status(404).json({
        error: {
          code: 'CLIENT_NOT_FOUND',
          message: 'Client not found'
        }
      });
    }

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}
