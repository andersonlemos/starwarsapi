import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors } from '@nestjs/common';
import { Planet } from '../../models/planets/planet.model';
import { Result } from '../../models/result.model';
import { ValidatorInterceptor } from '../../../interceptors/validator.interceptor';
import { CreatePlanetContract } from '../../../backoffice/contracts/planet.contract';


@Controller('v1/planets')
export class PlanetsController {

  @Get()
  get() {
    return new Result(null, true, [], null);;
  }

  @Get(':document')
  getById(@Param('document') document: string) {
    return new Result(null, true, {}, null);
  }

  //  @Get('?name:planetName')
  //  getByName(@Param('planetName') document: string) {
  //   return new Result(null, true,  document, null);
  //  }

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreatePlanetContract()))
  criar(@Body() body: Planet) {
    return new Result('Planeta incluído com sucesso', true, body, null);
  }

  @Put(':document')
  alterar(@Param('document') document, @Body() body: Planet) {
    return new Result('Planeta Atualizado com sucesso', true, document, null);
  }

  @Delete(':document')
  remover(@Param('document') document: string) {
    return new Result('Planeta Removido com sucesso', true, document, null);
  }

}
