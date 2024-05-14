import { ServiceUseCase } from '@/app/usecases';
import { ServiceRepository } from '../repositories';
import { Request, Response } from 'express';
import { ErrorMessages } from '../utils';

export class ServiceController {
  private serviceUseCase: ServiceUseCase;

  constructor() {
    const serviceRepository = new ServiceRepository();
    const serviceUseCase = new ServiceUseCase(serviceRepository);
    this.serviceUseCase = serviceUseCase;
  }

  create = async (req: Request, res: Response) => {
    const data = req.body;
    if (!data.name) {
      return res.status(400).json(ErrorMessages.missingData());
    }

    try {
      const service = await this.serviceUseCase.create(data);
      return res.status(200).json(service);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Unique constraint violation')
          return res
            .status(400)
            .json(ErrorMessages.uniqueConstraintViolation());
        if (error.message === 'Foreign key constraint violation')
          return res
            .status(404)
            .json(ErrorMessages.foreignKeyConstraintViolation());
      }
      return res.status(500).json(ErrorMessages.internalServerError());
    }
  };

  getAll = async (req: Request, res: Response) => {
    const includeManagement = req.query.includeManagement === 'true';
    try {
      const services = await this.serviceUseCase.getAll({ includeManagement });
      return res.status(200).json(services);
    } catch (error) {
      return res.status(500).json(ErrorMessages.internalServerError());
    }
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const includeManagement = req.query.includeManagement === 'true';
    try {
      const service = await this.serviceUseCase.getById({
        id,
        includeManagement
      });
      if (!service) return res.status(404).json(ErrorMessages.notFound());
      return res.status(200).json(service);
    } catch (error) {
      return res.status(500).json(ErrorMessages.internalServerError());
    }
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    try {
      const service = await this.serviceUseCase.update(id, data);
      return res.status(200).json(service);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Unique constraint violation')
          return res
            .status(400)
            .json(ErrorMessages.uniqueConstraintViolation());
        if (error.message === 'Resource not found')
          return res.status(404).json(ErrorMessages.notFound());
        if (error.message === 'Foreign key constraint violation')
          return res
            .status(404)
            .json(ErrorMessages.foreignKeyConstraintViolation());
      }
      return res.status(500).json(ErrorMessages.internalServerError());
    }
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const service = await this.serviceUseCase.delete(id);
      if (!service) {
        return res.status(404).json(ErrorMessages.notFound());
      }
      return res.status(200).json(service);
    } catch (error) {
      if (error instanceof Error && error.message === 'Resource not found') {
        return res.status(404).json(ErrorMessages.notFound());
      }
      return res.status(500).json(ErrorMessages.internalServerError());
    }
  };
}
