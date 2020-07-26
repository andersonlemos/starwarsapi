import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RepositoryBase } from './repositoryBase.interface.';
import { Planets } from '../entities/planet.entity';

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

    async remove(criteria: string): Promise<number> {
        const result = await this._planetsRepository.delete(criteria);
        return result.affected;
    }

    async findById(criteria: string): Promise<Planets> {
        return await this._planetsRepository.findOne(criteria);
    }

    async findByName(name: string): Promise<Planets> {
        return await this._planetsRepository.findOne({ name: name });
    }

    async findAll(): Promise<Planets[]> {
        return await this._planetsRepository.find();
    }

    async insert(model: Planets): Promise<Planets> {
        return this._planetsRepository.save(model);
    }
}
