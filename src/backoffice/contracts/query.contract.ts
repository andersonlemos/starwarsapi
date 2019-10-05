import { Injectable } from '@nestjs/common';
import { Contract } from './contract';
import { Flunt } from '../../utils/flunt';
import { QueryDto } from '../dtos/query.dto';
import { environment } from '../../utils/environment';

@Injectable()
export class QueryContract implements Contract {
  errors: any[];

  validate(model: QueryDto): boolean {
    const flunt = new Flunt();

    flunt.isGreaterThan(model.take, environment.quantityOfRecords,  `Take can not return more than ${environment.quantityOfRecords} records!`);
    flunt.isGreaterThan(model.skip, environment.skipLimit, `Skip can not be greather than ${environment.skipLimit} records!`);

    this.errors = flunt.errors;

    return flunt.isValid();
  }

}
