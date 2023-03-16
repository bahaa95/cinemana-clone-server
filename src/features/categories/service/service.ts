import { CategoryDocument, CategoryModel } from '../model';
import { CategoryService as ICategoryService } from './types';

// ! don't return the value for private method to clients and admins it's for internal usage only.
// ! only return the value for public methods.

export class CategoryService implements ICategoryService {
  private readonly Category: CategoryModel;

  constructor(categoryModel: CategoryModel) {
    this.Category = categoryModel;
  }

  /**
   * @access public dashboard
   */
  public addCategory: ICategoryService['addCategory'] = async (category) => {
    let newCategory = await new this.Category(category).save();
    return newCategory;
  };

  /**
   * @access public dashboard
   */
  public editCategory: ICategoryService['editCategory'] = async (
    _id,
    category,
  ) => {
    let editedCategory = await this.Category.findOneAndUpdate(
      { _id },
      {
        $set: category,
      },
      { new: true },
    );

    return editedCategory;
  };

  /**
   * @access public dashboard
   */
  public deleteCategory: ICategoryService['deleteCategory'] = async (_id) => {
    let deletedCategory = await this.Category.findByIdAndDelete({ _id });
    return deletedCategory;
  };

  /**
   * @access public dashboard, cinemana-client
   */
  public getCategories: ICategoryService['getCategories'] = async () => {
    let categories = await this.Category.aggregate<CategoryDocument>([
      { $match: {} },
    ]);

    return categories;
  };
}
