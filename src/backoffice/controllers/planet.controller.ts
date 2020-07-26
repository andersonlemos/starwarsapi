import {
    Controller,
    Get,
    Post,
    Delete,
    Param,
    Body,
    UseInterceptors,
    HttpException,
    HttpStatus,
    Query,
    CacheInterceptor,
    Injectable,
    Inject,
    Put,
} from '@nestjs/common';

import { ValidatorInterceptor } from '../../interceptors/validator.interceptor';
import { PlanetService } from '../services/planet.service';
import { CreatePlanetContract } from '../contracts/create-planet.contract';
import { SwapiService } from '../services/swapi.service';
import { Planets } from '../entities/planet.entity';
import { CreatePlanetDto } from '../dtos/create-planet.dto';
import { ObjectID } from 'typeorm';

@Controller('v1/planets')
export class PlanetsController {
    private readonly _planetService: PlanetService;
    constructor(
        @Inject(PlanetService) private readonly planetService: PlanetService,
    ) {
        this._planetService = planetService;
    }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreatePlanetContract()))
    async post(@Body() model: CreatePlanetDto) {
        try {
            const swapi = await SwapiService.getAppearences(model.name);

            const _entity: Planets = model;

            if (Object.entries(swapi.data.results).length > 0) {
                _entity.moviesAppearances = swapi.data.results[0].films;
                _entity.countMoviesAppearances =
                    _entity.moviesAppearances.length;
            }

            await this._planetService.insert(_entity);
        } catch (error) {
            return new HttpException(
                `:: POST ERROR :: ${error}`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Get()
    async get() {
        try {
            return await this._planetService.findAll();
        } catch (error) {
            return new HttpException(
                `:: GET ERROR :: ${error}`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Put(':id')
    @UseInterceptors(new ValidatorInterceptor(new CreatePlanetContract()))
    async put(@Param('id') id: ObjectID, @Body() model: CreatePlanetDto) {
        try {
            const swapi = await SwapiService.getAppearences(model.name);

            const _entity: Planets = model;

            _entity.id = id;

            if (Object.entries(swapi.data.results).length > 0) {
                _entity.moviesAppearances = swapi.data.results[0].films;
                _entity.countMoviesAppearances =
                    _entity.moviesAppearances.length;
            }

            await this._planetService.update(_entity);
        } catch (error) {
            return new HttpException(
                `:: UPDATE ERROR :: ${error}`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        try {
            if (id.toString().match(/^[0-9a-fA-F]{24}$/)) {
                return await this._planetService.findById(id);
            }
        } catch (error) {
            throw new HttpException(
                `:: GET ERROR :: ${error}`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Get('/name/:name')
    async getByName(@Param('name') name: string) {
        try {
            return await this._planetService.findByName(name);
        } catch (error) {
            throw new HttpException(
                `:: GET ERROR :: ${error}`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        try {
            if (id.toString().match(/^[0-9a-fA-F]{24}$/)) {
                return await this._planetService.remove(id);
            }
        } catch (error) {
            throw new HttpException(
                `:: GET ERROR :: ${error}`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
