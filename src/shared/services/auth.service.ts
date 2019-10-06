import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { AccountService } from '../../backoffice/services/account.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
   constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  async createToken(username: string, roles: string[]) {
    const user: JwtPayload = {username, roles};

    return this.jwtService.sign(user);

  }
  async validateUser(payload: JwtPayload): Promise<any> {
    return payload;
  }

}
