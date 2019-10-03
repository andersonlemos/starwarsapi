import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Planeta } from '../../models/planetas/planeta.model';

@Controller('v1/planetas')
export class PlanetasController {

  @Get()
  buscarTodos() {
    return 'Obter os planetas';
  }

  @Get(':documento')
  buscarPorId(@Param('documento') documento) {
    return 'Obter Planeta ' + documento;
  }

  // @Get(':nome')
  // buscaPorNome(@Param('nome') nome) {
  //   return 'Obter Planeta ' + nome;
  // }

  @Post()
  criar(@Body() body: Planeta) {
    return 'Criar um planeta' + body.nome;
  }

  @Put(':documento')
  alterar(@Param('documento') document, @Body() body) {
    return {
      planeta : document,
      data: body,
    };
  }

  @Delete(':document')
  remover(@Param('document') document) {
    return 'Remover um planeta';
  }

}
