import express from 'express';
import { managementRouter } from './management.routes';
import { serviceRouter } from './service.routes';

export const router = express.Router();

router.use('/managements', managementRouter);
router.use('/services', serviceRouter);
