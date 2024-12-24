import { INestApplication } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';

export function notifyServerError(app: INestApplication<any>) {
  const loggerService = app.get(LoggerService);

  process.on('uncaughtException', (error) => {
    loggerService.error(`Unhandled Exception ${error && error.message}`, error);
  });

  process.on('unhandledRejection', (reason: any, promise) => {
    loggerService.error(`Unhandled Rejection: ${reason}`, {
      stack: reason.stack || reason,
      promise,
    });
  });
}
