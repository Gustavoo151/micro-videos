import { Entity } from '../entity';
import { ValueObject } from '../value-object';

export interface IRepository<E extends Entity, Entity_Id extends ValueObject> {
  insert(entity: E): Promise<void>;
  bulkInsert(entities: E[]): Promise<void>;
  update(entity: E): Promise<void>;
  delete(entity_id: Entity_Id): Promise<void>;

  findById(entity_id: Entity_Id): Promise<E | null>;
  findAll(): Promise<E[]>;

  getEntity(): new (...args: any[]) => E;
}
