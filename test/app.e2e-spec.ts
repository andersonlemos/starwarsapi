import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { HttpStatus } from '@nestjs/common';
import { CreatePlanetDto } from './../src/backoffice/dtos/create-planet.dto';

describe('AppController (e2e)', () => {
  let app;

  const PLANETS_BASE_URL = '/V1/planets';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Get All Planets (GET)', () => {
    return request(app.getHttpServer())
      .get(`${PLANETS_BASE_URL}`)
      .expect(HttpStatus.OK);
  });

  it('Get Planet by Id (GET)', () => {
    const planetId = '5d9ab3b2a11ae14e0b148c7b';
    return request(app.getHttpServer())
      .get(`${PLANETS_BASE_URL}/${planetId}`)
      .expect(HttpStatus.OK);
  });

  it('Get Planet by Id NOT FOUND (GET)', () => {
    const planetId = '12345';
    return request(app.getHttpServer())
      .get(`${PLANETS_BASE_URL}/${planetId}`)
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('Get Planet by Name (GET)', () => {
    const planetName = 'hoth';
    return request(app.getHttpServer())
      .get(`${PLANETS_BASE_URL}/name/${planetName}`)
      .expect(HttpStatus.OK);
  });

  it('Create Planet (POST)', () => {
    const planet = new CreatePlanetDto("Cheidim", "frio", "gelo", 0, []);
    return request(app.getHttpServer())
      .post(`${PLANETS_BASE_URL}/`)
      .send(planet)
      .expect(HttpStatus.CREATED);
  });

  it('Delete Planet NOT FOUND (DELETE)', () => {
    const planetId = 'x';
    return request(app.getHttpServer())
      .delete(`${PLANETS_BASE_URL}/`)
      .send(planetId)
      .expect(HttpStatus.NOT_FOUND);
  });
});
