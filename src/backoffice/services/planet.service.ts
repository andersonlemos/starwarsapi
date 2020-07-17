import { Injectable, HttpService } from '@nestjs/common';
import { QueryDto } from '../dtos/query.dto';
import { Planets } from '../entities/planet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlanetDto } from '../dtos/create-planet.dto';
@Injectable()
export class PlanetService {
  constructor(
    @InjectRepository(Planets) private readonly planetsRepository: Repository<Planets>,
    private readonly httpService: HttpService
    ) {}

  async create(data: CreatePlanetDto): Promise<Planets> {
    return await this.planetsRepository.save(data);
  }

  async findAll(): Promise<Planets[]>  {
    return await this.planetsRepository.find()
  }
  async findById(id): Promise<Planets>  {
    
    return await this.planetsRepository
                     .findOne({
                       where: { 
                         _id: { $eq:document } 
                        }
                      })
  }

  async findByName(name): Promise<Planets>  {
     return await this.planetsRepository
                      .findOne({
                        where: { 
                          name: { $eq: name } 
                        }
                      })
  }

  async remove(id): Promise<void>  {
      await this.planetsRepository.delete(id)
  }

  async query(document: QueryDto): Promise<Planets[]> {
    return await this.planetsRepository.find()
                    //  .find(document.query,
                    //   document.fields,
                    //   {
                    //     skip: Number(document.skip),
                    //     limit: Number(document.take),
                    //   })
                    //   .exec();

  }

  getFilms(document: string) {
    
    const url = `${process.env.SWAPI_URL}/planets/?search=${document}`;

    return this.httpService.get(url);
  }

}
