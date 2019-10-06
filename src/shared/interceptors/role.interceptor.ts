import { NestInterceptor, Injectable, ExecutionContext, CallHandler, HttpException, HttpStatus } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { ResultDto } from "../../backoffice/dtos/result.dto";

@Injectable()
export class RoleInterceptor implements NestInterceptor {
  constructor(public roles: string[]) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const payload: JwtPayload = context.switchToHttp().getRequest().user;
  
    // if (!hasRole) {
    //   throw new HttpException(
    //     new ResultDto('Access Unauthorized', false, null, null),
    //     HttpStatus.UNAUTHORIZED,
    //   );
    // }

    return next.handle();
  }

}
