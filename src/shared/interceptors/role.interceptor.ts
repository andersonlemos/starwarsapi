import { NestInterceptor, Injectable, ExecutionContext, CallHandler, HttpException, HttpStatus } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { ResultDto } from "../../backoffice/dtos/result.dto";

@Injectable()
export class RoleInterceptor implements NestInterceptor {
  constructor(public roles: string[]) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const payload: JwtPayload = context.switchToHttp().getRequest().user;
   console.log(payload);

    let hasRole = false;
    payload.roles.forEach((role) => {
        if (this.roles.includes(role))
            hasRole = true;
    });

    if (!hasRole) {
        throw new HttpException(
            new ResultDto('Acesso não autorizado', false, null, null),
            HttpStatus.UNAUTHORIZED);
    }

    return next.handle();
  }

}
