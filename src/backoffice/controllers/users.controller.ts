import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { Result } from '../models/result.model';
import { ValidatorInterceptor } from '../../interceptors/validator.interceptor';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateUserContract } from '../contracts/user.contract';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Controller('v1/users')
export class UsersController {

  constructor(private readonly userService: UserService) {

  }

  @Get(':document')
  async getById(@Param('document') document: string) {
    const user = await this.userService.findById(document);
    return new Result(null, true, user, null);
  }

  @Get('/find/:name')
  async getByName(@Param('name') name: string) {
    const user = await this.userService.findByName(name);
    return new Result(null, true, user, null);
  }

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateUserContract()))
  async post(@Body() model: CreateUserDto) {
    try {

      const user = await this.userService
                           .create(
                              new User(
                                model.username,
                                model.password,
                                model.active,
                                model.roles,
                              ));

      return new Result('User successfully added', true, user, null);
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
  async delete(@Param('document') document: string) {
    try {

      const user = await this.userService.remove(document);
      return new Result('User successfully removed!', true, user, null);

    } catch (error) {
          return new HttpException(
            new Result('User could not be deleted',
                                  false,
                                  null,
                                  error),
                HttpStatus.BAD_REQUEST);

    }
  }

}
