import logger from "./../config/logger";

type LoggerServiceDependencies = {
  logger: typeof logger;
}

export interface ILoggerService {
  loggerInfo(message: string, data?: any): void;
}

export class LoggerService {
  logger: typeof logger;

  constructor(params: LoggerServiceDependencies) {
    this.logger = params.logger;
  }

  loggerInfo(message: string, data: any) {
    return this.logger.info(message, data);
  };
}