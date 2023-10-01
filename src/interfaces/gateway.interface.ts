import { Filter } from './filters.interface';

export interface GatewayInterface<T> {
  create(value?: T): Promise<T>;
  update?(id: string, value?: T): Promise<boolean>;
  delete?(id: string): Promise<void>;
  findAll?(filters?: Filter<T>): Promise<T[]>;
  findById?(id: string): Promise<T>;
  findByFilter?(filters: Filter<T>): Promise<T>;
}
