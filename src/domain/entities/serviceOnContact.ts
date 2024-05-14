export class ServiceOnContact {
  id?: string;
  serviceId: string;
  contactId: string;
  createdBy: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  constructor(data: {
    id?: string;
    serviceId: string;
    contactId: string;
    createdBy: string | null;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = data.id;
    this.serviceId = data.serviceId;
    this.contactId = data.contactId;
    this.createdBy = data.createdBy;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
