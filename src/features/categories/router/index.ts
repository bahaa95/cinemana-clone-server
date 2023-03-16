import { IRouter, Router as router } from 'express';
import { Router } from '@/static/router';
import { ICategoryController } from '../controller';
import { validateResource } from '@/middleware/validateResource';
import { limiter } from '@/middleware/limiter';
import { verifyJwt } from '@/middleware/verifyJwt';
import { verifyRoles } from '@/middleware/verifyRoles';
import {
  addCategorySchema,
  editCategorySchema,
  deleteCategorySchema,
} from '../validation';
import { AdministratorRoles } from '@/features/administrators';

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
    /**
     * * dashboard
     */
    // * add new category
    this.router.post(
      `/admin/dashboard${this.path}`,
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin, AdministratorRoles.Data_Admin),
      validateResource(addCategorySchema),
      this.categoryController.addCategory,
    );

    // * edit category
    this.router.patch(
      `/admin/dashboard${this.path}/:_id`,
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin, AdministratorRoles.Data_Admin),
      validateResource(editCategorySchema),
      this.categoryController.editCategory,
    );

    // * delete category
    this.router.delete(
      `/admin/dashboard${this.path}/:_id`,
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin, AdministratorRoles.Data_Admin),
      validateResource(deleteCategorySchema),
      this.categoryController.deleteCategory,
    );

    // * get categories
    this.router.get(
      `/admin/dashboard${this.path}`,
      verifyJwt,
      verifyRoles(
        AdministratorRoles.Admin,
        AdministratorRoles.Data_Admin,
        AdministratorRoles.Viewers,
      ),
      this.categoryController.getCategories,
    );

    /**
     * * cinemana client
     */
    // * get categories
    this.router.get(
      this.path,
      limiter({ max: 100 }),
      this.categoryController.getCategories,
    );
  }
}
