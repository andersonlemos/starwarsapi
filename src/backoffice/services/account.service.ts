import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../models/user.model';
import { Md5 } from 'md5-typescript';
import { environment } from '../../utils/environment';
@Injectable()
export class AccountService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,

    ) {}

  async authenticate(username: string, password: string): Promise<User> {
    const account =  await this.userModel
                      .findOne({username: username})
                      .exec();
    if (account) {
      const pass = await Md5.init(`${password}${environment.SALT_KEY}`);
      if (pass.localeCompare(account.password.toString()) === 0) {
        return account;
      }
    }

    return null;
  }

  async create(model: User): Promise<User> {
    const password = await Md5.init(`${model.password}${environment.SALT_KEY}`);
    const user = new this.userModel(new User(model.username,
                                             password,
                                             model.active));
    return await user.save();
  }

  async remove(document): Promise<User> {
    return await this.userModel
                     .deleteOne({ _id : document})
                     .exec();
  }
}
