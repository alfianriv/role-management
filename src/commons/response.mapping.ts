import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ResponseFormat {
  data: any | Array<any>;
  total?: number;
  page?: number;
  perPage?: number;
  [x: string | number | symbol]: unknown;
}

@Injectable()
export class ResponseMapping implements NestInterceptor<ResponseFormat> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseFormat> {
    return next.handle().pipe(
      map((incomingData) => {
        let metadata: any = {};
        let data;

        if (typeof incomingData === 'undefined') {
          data = null;
        } else if (
          incomingData &&
          typeof incomingData === 'object' &&
          Array.isArray(incomingData) === false
        ) {
          data = incomingData.data || null;
          metadata = Object.assign({}, incomingData);
          delete metadata.data;
        } else {
          data = incomingData;
        }

        const response: any = {
          data,
          isArray: Array.isArray(data),
          metadata,
        };

        return response;
      }),
    );
  }
}
