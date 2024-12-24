import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const isDuplicateKeyErr =
      exception instanceof QueryFailedError &&
      exception.driverError &&
      exception.driverError.code === '23505';

    if (isDuplicateKeyErr) {
      httpAdapter.reply(
        ctx.getResponse(),
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Duplicated',
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      httpAdapter.reply(
        ctx.getResponse(),
        exception instanceof HttpException
          ? exception.getResponse()
          : {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Internal Server Error',
            },
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
