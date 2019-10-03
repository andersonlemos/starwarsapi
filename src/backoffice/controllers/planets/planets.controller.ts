import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Planet } from '../../models/planetas/planet.model';
import { Result } from '../../models/result.model';

@Controller('v1/planetas')
export class PlanetsController {

  @Get()
  get() {
    return new Result(null, true, [], null);;
  }

  @Get(':document')
  getById(@Param('document') document: string) {
    return new Result(null, true, {}, null);
  }

  // @Get(':nome')
  // buscaPorNome(@Param('nome') nome) {
  //   return 'Obter Planeta ' + nome;
  // }

  @Post()
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
