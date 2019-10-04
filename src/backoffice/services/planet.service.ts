import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Planet } from '../models/planet.model';
import { QueryDto } from '../dtos/query.dto';
@Injectable()
export class PlanetService {
  constructor(@InjectModel('Planet') private readonly model: Model<Planet>) {}

  async create(data: Planet): Promise<Planet> {
    const planet = new this.model(data);
    return await planet.save();
  }

  async findAll(): Promise<Planet[]>  {
    return await this.model
                     .find({}, 'name climate ground moviesAppearances')
                     .sort('name')
                     .exec();
  }
  async findById(document): Promise<Planet[]>  {
    return await this.model
                     .find({_id: document}, 'name climate ground moviesAppearances')
                     .exec();
  }

  async findByName(document): Promise<Planet[]>  {
    return await this.model
                     .find({name: document}, 'name climate ground moviesAppearances')
                     .exec();
  }

  async remove(document): Promise<Planet[]>  {
    return await this.model
                     .remove({_id: document})
                     .exec();
  }

  async query(model: QueryDto): Promise<Planet[]> {
    return await this.model
                     .find(model.query,
                      model.fields,
                      {
                        skip: model.skip,
                        limit: model.take,
                      })
                     .sort(model.sort)
                     .exec();

  }

}
