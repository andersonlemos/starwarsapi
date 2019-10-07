import { Controller,
         Get, Post, Delete,
         Param, Body, UseInterceptors,
         HttpException, HttpStatus,
         Query, 
         UseGuards,
         CacheInterceptor} from '@nestjs/common';

import { Result } from '../models/result.model';
import { ValidatorInterceptor } from '../../interceptors/validator.interceptor';
import { CreatePlanetContract } from '../contracts/planet.contract';
import { CreatePlanetDto } from '../dtos/create-planet.dto';
import { PlanetService } from '../services/planet.service';
import { Planet } from '../models/planet.model';
import { QueryDto } from '../dtos/query.dto';
import { JwtAuthGuard } from '../../shared/guards/auth.guard';

@Controller('v1/planets')
export class PlanetController {

  constructor(private readonly planetService: PlanetService) {

  }
 
  @Get()
  @UseInterceptors(CacheInterceptor)
  async get(@Query() options: QueryDto) {
      const planets = await this.planetService.query(options);
      return new Result(null, true,  planets, null);
  }

  @Get(':planetId')
  async getById(@Param('planetId') planetId: string) {
    const planet = await this.planetService.findById(planetId);
    return new Result(null, true, planet, null);
  }

  @Get('/name/:planetName')
  async getByName(@Param('planetName') planetName: string) {
    const planet = await this.planetService.findByName(planetName);
    return new Result(null, true, planet, null);
  }

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreatePlanetContract()))
  async post(@Body() model: CreatePlanetDto) {

    try {
      let countAppearances: number = 0;
      let appearences: any[];

      const swapi = await this.planetService.getFilms(model.name).toPromise();

      if (swapi.data.count > 0) {
        appearences = swapi.data.results[0].films;
        countAppearances = appearences.length;
      }

      const planet = await this.planetService
                              .create(
                                new Planet(
                                  model.name,
                                  model.climate,
                                  model.ground,
                                  countAppearances,
                                  appearences,
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

  @Delete(':planetId')
  async delete(@Param('planetId') planetId: string) {
      try {

        const planet = await this.planetService.remove(planetId);
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
