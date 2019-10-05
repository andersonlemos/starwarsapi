import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly model: Model<User>) {}

  async create(data: User): Promise<User> {
    const user = new this.model(data);
    return await user.save();
  }

  async findById(document): Promise<User[]>  {
    return await this.model
                     .find({_id: document}, '-password')
                     .exec();
  }

 async findByName(document): Promise<User> {
   return await this.model
                    .find({username: document}, '-password')
                    .exec();
 }

  async remove(document): Promise<User> {
    return await this.model
                     .remove({_id: document}, '-password')
                     .exec();
  }
}
