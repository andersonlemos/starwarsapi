import { Injectable } from '@nestjs/common';
import { Contract } from './contract';
import { Flunt } from '../../utils/flunt';
import { CreateUserDto } from '../dtos/create-user-dto';

@Injectable()
export class CreateUserContract implements Contract {
  errors: any[];

  validate(model: CreateUserDto): boolean {
    const flunt = new Flunt();

    flunt.isRequired(model.username, 'Username must be not empty');
    flunt.isRequired(model.password, 'Password must be not empty');
    flunt.hasMinLen(model.password, 6, 'Password must be at least 6 characteres ');
    flunt.isRequired(model.active, 'Active must be true or false');

    this.errors = flunt.errors;

    return flunt.isValid();
  }

}
