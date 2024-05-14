import { Service } from '../entities';

export interface IServiceRepository {
  create: (service: Service) => Promise<Service | undefined>;
  getAll: (params: { includeManagement?: boolean }) => Promise<Service[]>;
  getById: (params: {
    id: string;
    includeManagement?: boolean;
  }) => Promise<Service | null>;
  update: (id: string, service: Service) => Promise<Service | undefined>;
  delete: (id: string) => Promise<Service | null>;
}
