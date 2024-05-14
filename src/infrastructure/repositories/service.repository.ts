import { IServiceRepository, Service } from '@/domain';
import { prisma } from '../persistence/prisma';
import { Prisma } from '.prisma/client';

export class ServiceRepository implements IServiceRepository {
  public create = async (service: Service): Promise<Service | undefined> => {
    const { name, description, managementId, createdBy } = service;

    try {
      const insertedService = await prisma.service.create({
        data: { name, description, createdBy, managementId }
      });
      return {
        ...insertedService,
        managementId
      };
    } catch (error) {
      console.error('[CREATE_SERVICE]', error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('Unique constraint violation');
        }
        if (error.code === 'P2003') {
          throw new Error('Foreign key constraint violation');
        }
      }
      throw error;
    }
  };

  public getAll = async ({
    includeManagement
  }: {
    includeManagement?: boolean;
  }): Promise<Service[]> => {
    const services = await prisma.service.findMany({
      include: { management: includeManagement }
    });
    return services;
  };

  public getById = async ({
    id,
    includeManagement
  }: {
    id: string;
    includeManagement?: boolean;
  }): Promise<Service | null> => {
    return await prisma.service.findUnique({
      where: { id },
      include: { management: includeManagement }
    });
  };

  public update = async (
    id: string,
    service: Service
  ): Promise<Service | null> => {
    const { name, description, managementId, createdBy } = service;
    try {
      const updatedService = await prisma.service.update({
        where: { id },
        data: { name, description, managementId, createdBy }
      });

      return updatedService;
    } catch (error) {
      console.error('[UPDATE_SERVICE]', error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('Unique constraint violation');
        }
        if (error.code === 'P2003') {
          throw new Error('Foreign key constraint violation');
        }
      }
      throw error;
    }
  };

  public delete = async (id: string): Promise<Service | null> => {
    try {
      const deletedService = await prisma.service.delete({
        where: { id }
      });

      return deletedService;
    } catch (error) {
      console.error('[DELETE_SERVICE]', error);
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        (error.code === 'P2025' || error.code === 'P2016')
      ) {
        throw new Error(`Resource not found`);
      }
      throw error;
    }
  };
}
