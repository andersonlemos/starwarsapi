import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, Repository } from 'typeorm';
import { Criteria, RepositoryBase } from './repositoryBase.interface.';
import { Planets } from '../entities/planet.entity';
import { exception } from 'console';

@Injectable()
export class PlanetService implements RepositoryBase<Planets> {
    private readonly _planetsRepository: Repository<Planets>;
    constructor(
        @InjectRepository(Planets)
        private readonly planetsRepository: Repository<Planets>,
    ) {
        this._planetsRepository = planetsRepository;
    }

    async update(model: Planets): Promise<number> {
        const result = await this._planetsRepository.update(model.id, {
            name: model.name,
            terrain: model.terrain,
            climate: model.climate,
            countMoviesAppearances: model.countMoviesAppearances,
            moviesAppearances: model.moviesAppearances,
        });
        return result.affected;
    }

    async remove(id: string): Promise<number> {
        const result = await this._planetsRepository.delete(id);
        return result.affected;
    }

    async find(
        criteria: Criteria,
        value?: number | ObjectID | string,
    ): Promise<Planets[] | Planets> {
        return await this.findbyCriteria(criteria, value);
    }

    async insert(model: Planets): Promise<Planets> {
        return this._planetsRepository.save(model);
    }

    private findbyCriteria = (criteria: Criteria, value?: any) => {
        return (
            {
                All: this._planetsRepository.find(),
                byId: this._planetsRepository.findOne(value),
                byName: this._planetsRepository.findOne({ name: value }),
            }[Criteria[criteria]] || []
        );
    };
}
