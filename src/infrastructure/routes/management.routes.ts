import express from 'express';
import { ManagementController } from '../controllers';

export const managementRouter = express.Router();
const managementController = new ManagementController();

managementRouter.post('/create', managementController.create);
managementRouter.put('/update/:id', managementController.update);
managementRouter.get('/getAll', managementController.getAll);
managementRouter.get('/get/:id', managementController.getById);
managementRouter.delete('/delete/:id', managementController.delete);
