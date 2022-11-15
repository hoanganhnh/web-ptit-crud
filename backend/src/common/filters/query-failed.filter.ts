import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, HttpStatus } from '@nestjs/common';
import type { Request, Response } from 'express';
import { STATUS_CODES } from 'http';
import { QueryFailedError } from 'typeorm';

@Catch()
export class QueryFailedFilter implements ExceptionFilter<QueryFailedError> {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = HttpStatus.CONFLICT;

    // @TODO: handle error duplicate value
    // get duplicate value in mysql
    const value = exception.message.match(/(["'])(\\?.)*?\1/)[0];
    // const value = exception.message;

    const message = `Duplicate field value: ${value}. Please use another value !`;

    return response.status(status).json({
      statusCode: status,
      error: STATUS_CODES[status],
      message,
      timestamp: new Date().toISOString(),
      path: request.path,
    });
  }
}
