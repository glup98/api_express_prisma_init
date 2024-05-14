export interface IBaseRepository<T> {
  create(item: T): Promise<T | undefined>;
  update(id: string, item: Partial<T>): Promise<T | undefined>;
  getAll(params?: any): Promise<T[]>;
  getById(params: { id: string; [key: string]: any }): Promise<T | null>;
  delete(id: string): Promise<T | null>;
}
