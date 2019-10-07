import { Injectable } from '@nestjs/common';
import { Contract } from './contract';
import { Flunt } from '../../utils/flunt';
import { QueryDto } from '../dtos/query.dto';
import { environment } from '../../environment';

@Injectable()
export class QueryContract implements Contract {
  errors: any[];

  validate(model: QueryDto): boolean {
    const flunt = new Flunt();

    flunt.isGreaterThan(model.take,
          environment.COUNT_OF_RECORDS,
          `Take can not return more than ${environment.COUNT_OF_RECORDS} records!`);
    flunt.isGreaterThan(model.skip,
          environment.SKIP_LIMIT,
          `Skip can not be greather than ${environment.SKIP_LIMIT} records!`);

    this.errors = flunt.errors;

    return flunt.isValid();
  }

}
