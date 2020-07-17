import { Injectable } from '@nestjs/common';
import { Contract } from './contract';
import { Flunt } from '../../validators/flunt';
import { CreatePlanetDto } from '../dtos/create-planet.dto';

@Injectable()
export class CreatePlanetContract implements Contract {
  errors: any[];

  validate(model: CreatePlanetDto): boolean {
    const flunt = new Flunt();

    flunt.isRequired(model.name, 'Planet Name must be not empty');
    flunt.isRequired(model.climate, 'Climate must be not empty');
    flunt.isRequired(model.ground, 'Ground must be true or false');

    this.errors = flunt.errors;

    return flunt.isValid();
  }

}
