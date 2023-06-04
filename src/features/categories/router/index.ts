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

export class CategoryRouter extends Router<ICategoryController> {
  constructor(categoryController: ICategoryController) {
    super('/categories', categoryController);
    this.initializeRoutes();
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
      this.controller.addCategory,
    );

    // * edit category
    this.router.patch(
      `/admin/dashboard${this.path}/:_id`,
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin, AdministratorRoles.Data_Admin),
      validateResource(editCategorySchema),
      this.controller.editCategory,
    );

    // * delete category
    this.router.delete(
      `/admin/dashboard${this.path}/:_id`,
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin, AdministratorRoles.Data_Admin),
      validateResource(deleteCategorySchema),
      this.controller.deleteCategory,
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
      this.controller.getCategories,
    );

    /**
     * * cinemana client
     */
    // * get categories
    this.router.get(
      this.path,
      limiter({ max: 100 }),
      this.controller.getCategories,
    );
  }
}
