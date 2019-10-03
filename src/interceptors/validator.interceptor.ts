import { NestInterceptor, ExecutionContext, Injectable, CallHandler, HttpStatus, HttpException } from "@nestjs/common";
import { Observable } from "rxjs";
import { Contract } from "src/backoffice/contracts/contract";
import { Result } from "src/backoffice/models/result.model";

@Injectable()
export class ValidatorInterceptor implements NestInterceptor {
  constructor(public contract: Contract) {

  }
  intercept(context: ExecutionContext, call$: CallHandler<any>): Observable<any> {

    const body = context.switchToHttp().getRequest().body;
    const valid = this.contract.validate(body);

    if (!valid) {
      throw new HttpException(
                new Result('Ops an error occured!',
                          false,
                          null,
                          this.contract.erros),
            HttpStatus.BAD_REQUEST);

    }

    throw new Error("Method not implemented.");
  }

}
