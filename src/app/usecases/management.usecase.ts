import { IManagementRepository, Management } from '@/domain';
import { BaseUseCase } from './base.usecase';

export class ManagementUseCase extends BaseUseCase<Management> {
  constructor(repository: IManagementRepository) {
    super(repository);
  }

  protected instantiate(data: Management): Management {
    return new Management(data);
  }

  public async getAll({
    includeServices = false
  }: {
    includeServices?: boolean;
  } = {}): Promise<Management[]> {
    return await this.repository.getAll({ includeServices });
  }

  public async getById({
    id,
    includeServices = false
  }: {
    id: string;
    includeServices?: boolean;
  }): Promise<Management | null> {
    return await this.repository.getById({ id, includeServices });
  }
}
