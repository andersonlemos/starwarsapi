import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, HttpException, HttpStatus, Query } from '@nestjs/common';
import { Result } from '../models/result.model';
import { ValidatorInterceptor } from '../../interceptors/validator.interceptor';
import { CreatePlanetContract } from '../contracts/planet.contract';
import { CreatePlanetDto } from '../dtos/create-planet.dto';
import { PlanetService } from '../services/planet.service';
import { Planet } from '../models/planet.model';
import { QueryDto } from '../dtos/query.dto';
@Controller('v1/planets')
export class PlanetsController {

  constructor(private readonly planetService: PlanetService) {

  }

  @Get()
  async get() {
    const planets = await this.planetService.findAll();
    return new Result(null, true, planets, null);
  }
  @Get('')
  async getByQuery(@Query('skip') skip , @Query('take') take, @Query('sort') sort) {
    const document = new QueryDto(null, null,sort, skip, take);
    const planet = await this.planetService.query(document);
    return new Result(null, true, document, null);
  }
  @Get(':document')
  async getById(@Param('document') document: string) {
    const planet = await this.planetService.findById(document);
    return new Result(null, true, planet, null);
  }

  @Get('/name/:document')
  async getByName(@Param('document') document: string) {
    const planet = await this.planetService.findByName(document);
    return new Result(null, true, planet, null);
  }

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreatePlanetContract()))
  async post(@Body() model: CreatePlanetDto) {
    const planet = await this.planetService
                            .create(
                              new Planet(
                                model.name,
                                model.climate,
                                model.ground,
                                model.moviesAppearances,
                               ));
    return new Result('Planet successfully added!', true, planet, null);
  }

  @Delete(':document')
  async delete(@Param('document') document: string) {
      try {

        const planet = await this.planetService.remove(document);
        return new Result('Planet successfully removed!', true, planet, null);

      } catch (error) {
            return new HttpException(
              new Result('User could not be added',
                                    false,
                                    null,
                                    error),
                  HttpStatus.BAD_REQUEST);

      }
    }
  }
