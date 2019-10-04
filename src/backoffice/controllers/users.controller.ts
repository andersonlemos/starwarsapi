import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { Result } from '../models/result.model';
import { ValidatorInterceptor } from '../../interceptors/validator.interceptor';
import { CreateUserDto } from '../dtos/create-user-dto';
import { CreateUserContract } from '../contracts/user.contract';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Controller('v1/users')
export class UsersController {

  constructor(private readonly accountService: UserService) {

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

    try {

      const user = await this.accountService
                           .create(
                              new User(
                                model.username,
                                model.password,
                                model.active,
                                model.roles,
                              ));

      return new Result('User successfully added', true, {name:[user.username, user.roles, user.active]}, null);
    } catch (error) {

      return new HttpException(
                    new Result('User could not be added',
                                false,
                                null,
                                error),
                  HttpStatus.BAD_REQUEST);

    }

  }

  @Delete(':document')
  delete(@Param('document') document: string) {
    return new Result('User successfully removed', true, document, null);
  }

}
