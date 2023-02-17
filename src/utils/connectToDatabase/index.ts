import mongoose from 'mongoose';
import { logger } from '@/lib/logger';
import { MONGO_DB_PATH } from '@/config/index';
mongoose.set('strictQuery', false);

// eslint-disable-next-line
export async function connectToDatabase(): Promise<void> {
  await mongoose
    .connect(MONGO_DB_PATH)
    .then(() => logger.info('database connected'))
    .catch((err: Error) => {
      logger.error(err.message);
      process.exit(1);
    });
}
