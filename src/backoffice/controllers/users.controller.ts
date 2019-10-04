import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors } from '@nestjs/common';
import { Result } from '../models/result.model';
import { ValidatorInterceptor } from '../../interceptors/validator.interceptor';
import { CreateUserDto } from '../dtos/create-user-dto';
import { CreateUserContract } from '../contracts/user.contract';
import { AccountService } from '../services/account.service';
import { User } from '../models/user.model';

@Controller('v1/users')
export class UsersController {

  constructor(private readonly accountService: AccountService) {

  }

  @Get()
  get() {
    return new Result(null, true, [], null);
  }

  @Get(':document')
  getById(@Param('document') document: string) {
    return new Result(null, true, {}, null);
  }

  @Get('/find/:document')
  getByName(@Param('document') document: string) {
    return new Result(null, true, {}, null);
  }

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateUserContract()))
  async post(@Body() model: CreateUserDto) {
    const user = await this.accountService
                           .create(
                              new User(
                                model.username,
                                model.password,
                                model.active,
                                model.roles,
                              ));
    return new Result('User successfully added', true, {user}, null);
  }

  @Delete(':document')
  delete(@Param('document') document: string) {
    return new Result('User successfully removed', true, document, null);
  }

}
