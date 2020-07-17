import { Injectable } from '@nestjs/common';
import { Contract } from './contract';
import { Flunt } from '../../validators/flunt';
import { QueryDto } from '../dtos/query.dto';
@Injectable()
export class QueryContract implements Contract {
  errors: any[];

  validate(model: QueryDto): boolean {
    const flunt = new Flunt();

    flunt.isGreaterThan(model.take,
          process.env.COUNT_OF_RECORDS,
          `Take can not return more than ${process.env.COUNT_OF_RECORDS} records!`);
    flunt.isGreaterThan(model.skip,
          process.env.SKIP_LIMIT,
          `Skip can not be greather than ${process.env.SKIP_LIMIT} records!`);

    this.errors = flunt.errors;

    return flunt.isValid();
  }

}
