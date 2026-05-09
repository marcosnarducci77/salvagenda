import { Router } from 'express';
import {
  createClientController,
  deleteClientController,
  listClientsController,
  patchClientController
} from '../controllers/client.controller.js';

const clientRouter = Router();

clientRouter.get('/clients', listClientsController);
clientRouter.post('/clients', createClientController);
clientRouter.patch('/clients/:id', patchClientController);
clientRouter.delete('/clients/:id', deleteClientController);

export { clientRouter };
