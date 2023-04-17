import express, { Application, IRouter } from 'express';
import { NUMBER_OF_PROXIES, NODE_ENV } from '@/config';
import { errorHandler } from '@/middleware/errorHandler';
import { connectToDatabase } from '@/utils/connectToDatabase';
import cookieParser from 'cookie-parser';
import { cors } from '@/middleware/cors';
import { helmet } from '@/middleware/helmet';
import { compression } from '@/middleware/compression';
import { generateCookieId } from '@/middleware/generateCookieId';
import { logger } from '@/lib/logger';
import {
  setupSentry,
  errorHandler as sentryErrorHandler,
  requestHandler,
  tracingHandler,
} from '@/lib/sentry';

export class App {
  private app: Application;
  private port: number;

  constructor(_port: number, features: IRouter[]) {
    this.app = express();
    this.app.enable('trust proxy');
    this.port = _port;
    setupSentry(this.app);

    this.connectToDB();
    this.setupMiddleware();
    this.setupFeatures(features);
    NODE_ENV === 'production' && this.app.use(sentryErrorHandler());
    this.app.use(errorHandler);
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      logger.info(`Listening to port ${this.port}`);
    });
  }

  private async connectToDB(): Promise<void> {
    await connectToDatabase();
  }

  private setupMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(generateCookieId);

    // sentry
    NODE_ENV === 'production' && this.app.use(requestHandler());
    NODE_ENV === 'production' && this.app.use(tracingHandler());
  }

  private setupFeatures(features: IRouter[]): void {
    features.forEach((feature) => this.app.use('/api', feature));
  }
}
