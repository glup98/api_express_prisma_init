import { Service } from './service';

export class Management {
  id?: string;
  name: string;
  representativeName: string | null;
  description: string | null;
  createdBy: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  services?: Service[];

  constructor(data: {
    id?: string;
    name: string;
    representativeName: string | null;
    description: string | null;
    createdBy: string | null;
    createdAt?: Date;
    updatedAt?: Date;
    services?: Service[];
  }) {
    this.id = data.id;
    this.name = data.name;
    this.representativeName = data.representativeName;
    this.description = data.description;
    this.createdBy = data.createdBy;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.services = data.services;
  }
}
