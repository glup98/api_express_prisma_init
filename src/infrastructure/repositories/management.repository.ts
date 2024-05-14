import { Prisma } from '@prisma/client';
import { prisma } from '../persistence/prisma';
import { IManagementRepository, Management } from '@/domain';

export class ManagementRepository implements IManagementRepository {
  public create = async (
    management: Management
  ): Promise<Management | undefined> => {
    const { name, description, representativeName, createdBy } = management;
    try {
      const upsertedManagement = await prisma.management.create({
        data: { name, description, representativeName, createdBy }
      });
      return upsertedManagement;
    } catch (error) {
      console.error('[CREATE_MANAGEMENT]', error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('Unique constraint violation');
        }
      }
      throw error;
    }
  };

  public update = async (
    id: string,
    management: Partial<Management>
  ): Promise<Management | undefined> => {
    const { name, description, representativeName } = management;
    try {
      const updatedManagement = await prisma.management.update({
        where: { id },
        data: { name, description, representativeName }
      });
      return updatedManagement;
    } catch (error) {
      console.error('[UPDATE_MANAGEMENT]', error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('Unique constraint violation');
        }
      }
      throw error;
    }
  };

  public getAll = async ({
    includeServices
  }: {
    includeServices?: boolean;
  }): Promise<Management[]> => {
    return await prisma.management.findMany({
      include: { services: includeServices }
    });
  };

  public getById = async ({
    id,
    includeServices
  }: {
    id: string;
    includeServices?: boolean;
  }): Promise<Management | null> => {
    return await prisma.management.findUnique({
      where: { id },
      include: { services: includeServices }
    });
  };

  public delete = async (id: string): Promise<Management | null> => {
    try {
      return await prisma.management.delete({ where: { id } });
    } catch (error) {
      console.error('[DELETE_MANAGEMENT]', error);
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
