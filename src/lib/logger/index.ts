import { createLogger, format, transports, Logger } from 'winston';
const { timestamp, combine, printf, errors, json, prettyPrint } = format;
import { isDevelopment } from '@/utils/isDevelopment';

class WinstonLogger {
  public logger: Logger;

  constructor() {
    if (isDevelopment()) {
      this.logger = this.developmentLogger();
    } else {
      this.logger = this.productionLogger();
    }
  }

  private developmentLogger() {
    return createLogger({
      level: 'silly',
      format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        this.format(),
        prettyPrint(),
      ),
      transports: [new transports.Console()],
      exitOnError: false,
    });
  }

  private productionLogger() {
    return createLogger({
      level: 'info',
      format: combine(timestamp(), errors({ stack: true }), json()),
      defaultMeta: { service: 'Portofolio Server' },
      transports: [],
      exitOnError: false,
    });
  }

  private format() {
    return printf(
      /* tslint:disable-next-line */
      ({ level, message, timestamp, stack }) =>
        `${timestamp} ${level}: ${message} ${stack || ''}`,
    );
  }
}

export const logger = new WinstonLogger().logger;
