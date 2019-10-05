import { JwtService } from '@nestjs/jwt';
import { AccountService } from 'src/backoffice/services/account.service';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
   constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  async createToke() {
    const user: JwtPayload = {username: 'test@gmail.com' };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: 3600,
      accessToken,
    };
  }
}
