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

  async createToken() {
    const user: JwtPayload = {
      document: '5d978630688a177452564529',
      roles: ['admin', 'dev'],
    };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: 3600,
      accessToken,
    };
  }
  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.accountService.findById(payload.document);
  }

}
