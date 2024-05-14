import { Request, Response } from 'express';
import { ManagementUseCase } from '@/app/usecases';
import { ManagementRepository } from '../repositories';
import { ErrorMessages } from '../utils';

export class ManagementController {
  private managementUseCase: ManagementUseCase;

  constructor() {
    const managementRepository = new ManagementRepository();
    const managementUseCase = new ManagementUseCase(managementRepository);
    this.managementUseCase = managementUseCase;
  }

  create = async (req: Request, res: Response) => {
    const data = req.body;
    if (!data.name) {
      return res.status(400).json(ErrorMessages.missingData());
    }
    try {
      const management = await this.managementUseCase.create(data);
      return res.status(200).json(management);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === 'Unique constraint violation'
      ) {
        return res.status(400).json(ErrorMessages.uniqueConstraintViolation());
      }
      return res.status(500).json(ErrorMessages.internalServerError());
    }
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    try {
      const management = await this.managementUseCase.update(id, data);
      return res.status(200).json(management);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Unique constraint violation')
          return res
            .status(400)
            .json(ErrorMessages.uniqueConstraintViolation());
        if (error.message === 'Resource not found')
          return res.status(404).json(ErrorMessages.notFound());
      }
      return res.status(500).json(ErrorMessages.internalServerError());
    }
  };

  getAll = async (req: Request, res: Response) => {
    const includeServices = req.query.includeServices === 'true';
    try {
      const managements = await this.managementUseCase.getAll({
        includeServices
      });
      return res.status(200).json(managements);
    } catch (error) {
      return res.status(500).json(ErrorMessages.internalServerError());
    }
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const includeServices = req.query.includeServices === 'true';

    try {
      const management = await this.managementUseCase.getById({
        id,
        includeServices
      });
      if (!management) return res.status(404).json(ErrorMessages.notFound());
      return res.status(200).json(management);
    } catch (error) {
      return res.status(500).json(ErrorMessages.internalServerError());
    }
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const management = await this.managementUseCase.delete(id);
      if (!management) return res.status(404).json(ErrorMessages.notFound());
      return res.status(200).json(management);
    } catch (error) {
      if (error instanceof Error && error.message === 'Resource not found') {
        return res.status(404).json(ErrorMessages.notFound());
      }
      return res.status(500).json(ErrorMessages.internalServerError());
    }
  };
}
