import { Router } from 'express';
import { clientRouter } from './client.routes.js';
import { rootRouter } from './root.routes.js';
import { healthRouter } from './health.routes.js';
import whatsappRouter from './whatsapp.routes.js';

const router = Router();

router.use(rootRouter);
router.use(healthRouter);
router.use(clientRouter);
router.use('/whatsapp', whatsappRouter);

export { router };
