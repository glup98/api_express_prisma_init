import { IServiceRepository, Service } from '@/domain';
import { BaseUseCase } from './base.usecase';

export class ServiceUseCase extends BaseUseCase<Service> {
  constructor(repository: IServiceRepository) {
    super(repository);
  }

  protected instantiate(data: Service): Service {
    return new Service(data);
  }

  public async getAll({
    includeManagement = false
  }: {
    includeManagement?: boolean;
  }) {
    return await this.repository.getAll({ includeManagement });
  }

  public async getById({
    id,
    includeManagement = false
  }: {
    id: string;
    includeManagement?: boolean;
  }) {
    return await this.repository.getById({ id, includeManagement });
  }
}
