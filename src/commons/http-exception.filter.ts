import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const getError: any = exception.getResponse();

    response.status(status).json({
      message: getError.message,
      system: {
        message: getError.error,
        code: status,
      },
      user: {
        message: getError.message,
      },
      errorCode: status,
      data: getError.data,
    });
  }
}
