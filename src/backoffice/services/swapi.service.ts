import {
    Injectable,
    HttpService,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
@Injectable()
export abstract class SwapiService {
    static getAppearences(document: string): Promise<any> {
        try {
            const url = `${process.env.SWAPI_URL}/planets/?search=${document}`;
            return new HttpService().get(url).toPromise();
        } catch (error) {
            return new Promise(() => {
                return new HttpException(
                    ` Erro:: ${error}`,
                    HttpStatus.BAD_REQUEST,
                );
            });
        }
    }
}
