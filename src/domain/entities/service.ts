import { Management } from './management';
import { ServiceOnContact } from './serviceOnContact';

export class Service {
  id?: string;
  name: string;
  description: string | null;
  managementId: string;
  management?: Management;
  createdBy: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  serviceOnContact?: ServiceOnContact[];
  constructor(data: {
    id?: string;
    name: string;
    description: string | null;
    managementId: string;
    management?: Management;
    createdBy: string | null;
    createdAt?: Date;
    updatedAt?: Date;
    serviceOnContact?: ServiceOnContact[];
  }) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.managementId = data.managementId;
    this.management = data.management;
    this.createdBy = data.createdBy;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.serviceOnContact = data.serviceOnContact;
  }
}
