import { ObjectID } from 'typeorm';

export interface RepositoryBase<T> {
    insert(model: T): Promise<T>;
    update(model: T): Promise<number>;
    remove(id: number | ObjectID | string): Promise<number>;
    findById(id: number | ObjectID | string): Promise<T>;
    findByName(name: string): Promise<T>;
    findAll(): Promise<T[]>;
}
