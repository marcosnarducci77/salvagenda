import { Request, Response } from 'express';

export function rootController(_req: Request, res: Response) {
  res.status(200).json({
    name: 'SalvAgenda API',
    status: 'running',
    version: '1.0.0'
  });
}
