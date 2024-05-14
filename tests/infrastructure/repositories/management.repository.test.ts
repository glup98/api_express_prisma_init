import { ManagementRepository } from '@/infrastructure/repositories';
import { prismaMock } from '../../singleton';

describe('ManagementRepository', () => {
  const managementRepository = new ManagementRepository();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new management entry', async () => {
      const managementData = {
        id: '1',
        name: 'Test Management',
        description: 'This is a test description',
        representativeName: 'Test Representative',
        createdBy: 'Test Creator',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const expectedData = {
        name: 'Test Management',
        description: 'This is a test description',
        representativeName: 'Test Representative',
        createdBy: 'Test Creator'
      };

      prismaMock.management.create.mockResolvedValue(managementData);

      const result = await managementRepository.create(expectedData);

      expect(prismaMock.management.create).toHaveBeenCalledWith({
        data: expect.objectContaining(expectedData)
      });
      expect(result).toEqual(managementData);
    });
  });
});
