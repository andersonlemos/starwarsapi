import { NestInterceptor, ExecutionContext, Injectable, CallHandler, HttpStatus, HttpException } from "@nestjs/common";
import { Observable } from 'rxjs';
import { Contract } from '../backoffice/contracts/contract';
import { Result } from '../backoffice/models/result.model';


@Injectable()
export class ValidatorInterceptor implements NestInterceptor {
  constructor(public contract: Contract) {

  }

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

      const body = context.switchToHttp().getRequest().body;
      const valid = this.contract.validate(body);

      if (!valid) {
        throw new HttpException(
                  new Result('Ops an error occured!',
                            false,
                            null,
                            this.contract.errors),
              HttpStatus.BAD_REQUEST);

      }
      return next.handle();
  }

}
