import { ObjectID } from 'typeorm';

export interface RepositoryBase<T> {
    insert(model: T): Promise<T>;
    update(model: T): Promise<number>;
    remove(id: number | ObjectID | string): Promise<number>;
    find(
        criteria: Criteria,
        value?: number | ObjectID | string,
    ): Promise<T[] | T>;
}
export enum Criteria {
    All = 0,
    byName = 1,
    byId = 2,
}
