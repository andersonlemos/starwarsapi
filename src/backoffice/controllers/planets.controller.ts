import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors } from '@nestjs/common';
import { Result } from '../models/result.model';
import { ValidatorInterceptor } from '../../interceptors/validator.interceptor';
import { CreatePlanetContract } from '../contracts/planet.contract';
import { CreatePlanetDto } from '../dtos/create-planet-dto';
@Controller('v1/planets')
export class PlanetsController {

  @Get()
  get() {
    return new Result(null, true, [], null);
  }

  @Get(':document')
  getById(@Param('document') document: string) {
    return new Result(null, true, {}, null);
  }

  @Get('/find/:document')
  getByName(@Param('document') document: string) {
    return new Result(null, true, {}, null);
  }

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreatePlanetContract()))
  post(@Body() body: CreatePlanetDto) {
    return new Result('Planet successfully added!', true, body, null);
  }

  @Delete(':document')
  delete(@Param('document') document: string) {
    return new Result('Planet successfully removed!', true, document, null);
  }

}
