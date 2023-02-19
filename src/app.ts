import express, { Application,IRouter } from 'express';
import { isProduction } from '@/utils/isProdection';
import { NUMBER_OF_PROXIES } from '@/config';
import { errorHandler } from '@/middleware/errorHandler';
import { connectToDatabase } from '@/utils/connectToDatabase';
import cookieParser from 'cookie-parser';
import { cors } from '@/middleware/cors';
import { helmet } from '@/middleware/helmet';
import { compression } from '@/middleware/compression';
import { logger } from '@/lib/logger';

export class App {
  private app: Application;
  private port: number;

  constructor(_port: number, features: IRouter[]) {
    this.app = express();
    /* tslint:disable-next-line */
    isProduction() && this.app.set('trust proxy', NUMBER_OF_PROXIES);
    this.port = _port;

    this.connectToDB();
    this.setupMiddleware();
    this.setupFeatures(features);
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
    // limiters purpose (a test endpoint that returns the client IP)
    this.app.get('/ip', (request, response) => response.send(request.ip));
  }

  private setupFeatures(features: IRouter[]): void {
    features.forEach((feature) => this.app.use('/api', feature));
  }
}
