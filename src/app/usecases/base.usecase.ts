import { IBaseRepository } from '@/domain';

export abstract class BaseUseCase<T> {
  protected repository: IBaseRepository<T>;

  constructor(repository: IBaseRepository<T>) {
    this.repository = repository;
  }

  public async create(data: T): Promise<T | undefined> {
    const item = this.instantiate(data);
    return await this.repository.create(item);
  }

  public async update(id: string, data: Partial<T>): Promise<T | undefined> {
    return await this.repository.update(id, data);
  }

  public async getAll(params: any = {}): Promise<T[]> {
    return await this.repository.getAll(params);
  }

  public async getById(params: {
    id: string;
    [key: string]: any;
  }): Promise<T | null> {
    return await this.repository.getById(params);
  }

  public async delete(id: string): Promise<T | null> {
    return await this.repository.delete(id);
  }

  // Método que debe ser implementado por las clases derivadas
  protected abstract instantiate(data: T): T;
}
