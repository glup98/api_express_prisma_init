import { Management } from '../entities';

export interface IManagementRepository {
  create: (management: Management) => Promise<Management | undefined>;

  update: (
    id: string,
    management: Partial<Management>
  ) => Promise<Management | undefined>;

  getAll: (params: { includeServices?: boolean }) => Promise<Management[]>;

  getById: (params: {
    id: string;
    includeServices?: boolean;
  }) => Promise<Management | null>;

  delete: (id: string) => Promise<Management | null>;
}
