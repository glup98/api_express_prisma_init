import express from 'express';
import { ServiceController } from '../controllers';

export const serviceRouter = express.Router();
const serviceController = new ServiceController();

serviceRouter.post('/create', serviceController.create);
serviceRouter.get('/getAll', serviceController.getAll);
serviceRouter.get('/get/:id', serviceController.getById);
serviceRouter.put('/update/:id', serviceController.update);
serviceRouter.delete('/delete/:id', serviceController.delete);
