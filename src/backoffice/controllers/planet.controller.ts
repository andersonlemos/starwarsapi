import { Controller,
         Get, Post, Put, Delete,
         Param, Body, UseInterceptors,
         HttpException, HttpStatus,
         Query } from '@nestjs/common';
import { Result } from '../models/result.model';
import { ValidatorInterceptor } from '../../interceptors/validator.interceptor';
import { CreatePlanetContract } from '../contracts/planet.contract';
import { CreatePlanetDto } from '../dtos/create-planet.dto';
import { PlanetService } from '../services/planet.service';
import { Planet } from '../models/planet.model';
import { QueryDto } from '../dtos/query.dto';
import { QueryContract } from '../contracts/query.contract';
@Controller('v1/planets')
export class PlanetController {

  constructor(private readonly planetService: PlanetService) {

  }

  @Get()
  async get(@Query() options: QueryDto) {
      const planets = await this.planetService.query(options);
      return new Result(null, true,  planets, null);
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
    try {
      const planet = await this.planetService
                              .create(
                                new Planet(
                                  model.name,
                                  model.climate,
                                  model.ground,
                                  model.moviesAppearances,
                                ));
      return new Result('Planet successfully added!', true, planet, null);
  } catch (error) {
    return new HttpException(
       new Result('User could not be added',
                            false,
                            null,
                            error),
           HttpStatus.BAD_REQUEST);

}
  }

  @Delete(':document')
  async delete(@Param('document') document: string) {
      try {

        const planet = await this.planetService.remove(document);
        return new Result('Planet successfully removed!', true, planet, null);

      } catch (error) {
            return new HttpException(
              new Result('Planet could not be deleted',
                                    false,
                                    null,
                                    error),
                  HttpStatus.BAD_REQUEST);

      }
    }
  }
