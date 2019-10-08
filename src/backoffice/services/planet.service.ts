import { Model } from 'mongoose';
import { Injectable, HttpService, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Planet } from '../models/planet.model';
import { QueryDto } from '../dtos/query.dto';
import { environment } from '../../environment';
@Injectable()
export class PlanetService {
  constructor(
    @InjectModel('Planet') private readonly model: Model<Planet>,
    private readonly httpService: HttpService
    ) {}

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
  async findById(document): Promise<Planet>  {
    
    return await this.model
                     .findOne({_id: document}, 'name climate ground moviesAppearances')
                     .exec();
  }

  async findByName(document): Promise<Planet>  {
     return await this.model
                     .find({name: document}, 'name climate ground moviesAppearances')
                     .exec();
  }

  async remove(document): Promise<Planet>  {
      return await this.model
                     .deleteOne({_id: document})
                     .exec();
  }

  async query(document: QueryDto): Promise<Planet[]> {
    return await this.model
                     .find(document.query,
                      document.fields,
                      {
                        skip: Number(document.skip),
                        limit: Number(document.take),
                      })
                     .sort(document.sort)
                     .exec();

  }

  getFilms(document: string) {
    
    const url = `${environment.SWAPI_URL}/planets/?search=${document}`;

    return this.httpService.get(url);
  }

}
