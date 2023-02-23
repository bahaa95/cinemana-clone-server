import { IRouter, Router as router } from 'express';
import { Router } from '@/static/router';
import { ICategoryController } from '../controller';
import { validateResource } from '@/middleware/validateResource';
import {
  addCategorySchema,
  editCategorySchema,
  deleteCategorySchema,
} from '../validation';

export class CategoryRouter extends Router {
  protected readonly path = '/categories';
  protected readonly router: IRouter;
  private readonly categoryController: ICategoryController;

  constructor(_categoryController: ICategoryController) {
    super();
    this.categoryController = _categoryController;
    this.router = router();
    this.initializeRoutes();
  }

  public getRoutes(): IRouter {
    return this.router;
  }
  protected initializeRoutes(): void {
    // * add new category
    this.router.post(
      this.path,
      validateResource(addCategorySchema),
      this.categoryController.shouldNotExistBefore,
      this.categoryController.addCategory,
    );

    // * edit category
    this.router.patch(
      `${this.path}/:_id`,
      validateResource(editCategorySchema),
      this.categoryController.shouldNotExistBefore,
      this.categoryController.editCategory,
    );

    // * delete category
    this.router.delete(
      `${this.path}/:_id`,
      validateResource(deleteCategorySchema),
      this.categoryController.deleteCategory,
    );

    // * get categories
    this.router.get(this.path, this.categoryController.getCategories);
  }
}
