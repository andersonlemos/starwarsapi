import {
    NestInterceptor,
    ExecutionContext,
    Injectable,
    CallHandler,
    HttpStatus,
    HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Contract } from '../backoffice/contracts/contract';

@Injectable()
export class ValidatorInterceptor implements NestInterceptor {
    private _contract: Contract;
    constructor(public contract: Contract) {
        this._contract = contract;
    }

    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        const body = context.switchToHttp().getRequest().body;
        const valid = this._contract.validate(body);

        if (!valid) {
            throw new HttpException(
                `Contract error:: ${this._contract._errors}`,
                HttpStatus.BAD_REQUEST,
            );
        }
        return next.handle();
    }
}
