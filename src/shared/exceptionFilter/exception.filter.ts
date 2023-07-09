import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { UnAuthGameUpdate } from '../exception/unAtuhGameUpdate.exception';
import { Response } from 'express';

@Catch(UnAuthGameUpdate)
export class UnAuthGameUpdateFilter implements ExceptionFilter {
  catch(exception: UnAuthGameUpdate, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(statusCode).json({
      statusCode: statusCode,
      message: exception.message,
    });
  }
}
