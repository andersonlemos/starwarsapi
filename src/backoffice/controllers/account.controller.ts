import { Controller, Post,
         UseInterceptors, HttpException,
         Body, HttpStatus, Delete, Param, UseGuards, Req } from '@nestjs/common';
import { AuthService } from '../../shared/services/auth.service';
import { JwtAuthGuard } from '../../shared/guards/auth.guard';
import { AccountService } from '../services/account.service';
import { AuthenticateDto } from '../dtos/authenticate.dto';
import { ResultDto } from '../dtos/result.dto';
import { Result } from '../models/result.model';
import { ValidatorInterceptor } from '../../interceptors/validator.interceptor';
import { CreateUserContract } from '../contracts/user.contract';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../models/user.model';
import { RoleInterceptor } from '../../shared/interceptors/role.interceptor';

@Controller('v1/accounts')
export class AccountController {
  constructor(
        private accountService: AccountService,
        private authService: AuthService,
  ) { }

  @Post('authenticate')
  async authenticate(@Body() model: AuthenticateDto): Promise<any> {
     const account = await this.accountService.authenticate(model.username, model.password);

     if (!account) {
          throw new HttpException(new ResultDto('Invalid user or password', false, null, null), HttpStatus.UNAUTHORIZED);
      }

     if (!account.active) {
          throw new HttpException(new ResultDto('User inactive', false, null, null), HttpStatus.UNAUTHORIZED);
      }

     const token = await this.authService.createToken(account.username, account.roles);
     return new ResultDto(null, true, token, null);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
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

      return new Result('User successfully added', true, [user.username, user.active], null);
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

      const user: any = await this.accountService.remove(document);

      if (user.deletedCount === 0) {
        return new HttpException(
              new Result('User does not exists',
                                    false,
                                    null,
                                    user),
                    HttpStatus.NOT_FOUND);
      }

      return new Result('User successfully removed!', true, user, null);

    } catch (error) {
          return new HttpException(
            new Result('User could not be removed',
                                  false,
                                  null,
                                  error),
                HttpStatus.BAD_REQUEST);

    }
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  async refreshToken(@Req() request): Promise<any> {
    const token = await this.authService.createToken(request.username, request.roles);
    return new ResultDto(null, true, token, null);
  }

}
