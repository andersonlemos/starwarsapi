import { Test, TestingModule } from '@nestjs/testing';
import { PlanetasController } from './planetas.controller';

describe('Planetas Controller', () => {
  let controller: PlanetasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanetasController],
    }).compile();

    controller = module.get<PlanetasController>(PlanetasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  
});
