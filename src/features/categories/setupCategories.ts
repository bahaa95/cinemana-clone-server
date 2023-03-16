import { IRouter } from 'express';
import { CategoryRouter } from './router';
import { CategoryController } from './controller';
import { CategoryService } from './service';
import { Category } from './model';

export function setupCategories(): IRouter {
  const router = new CategoryRouter(
    new CategoryController(new CategoryService(Category)),
  );

  return router.getRoutes();
}
