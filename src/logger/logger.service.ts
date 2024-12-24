import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  constructor() {}
  log(logMsg: string) {
    console.log('LOGGER', logMsg);
  }

  error(message: string, error: any) {
    const level = 'ERROR';
    const logMsg = `${level}: ${message}\n${JSON.stringify(error)}`;
    void this.log(logMsg);
  }

  info(message: string) {
    const level = 'INFO';
    const logMsg = `${level}: ${message}\n`;
    void this.log(logMsg);
  }
}
