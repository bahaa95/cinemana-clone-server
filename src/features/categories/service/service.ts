import { CategoryModel } from '../model';
import { CategoryService as ICategoryService } from './types';

export class CategoryService implements ICategoryService {
  private readonly Category: CategoryModel;

  constructor(categoryModel: CategoryModel) {
    this.Category = categoryModel;
  }

  addCategory: ICategoryService['addCategory'] = async (category) => {
    const newCategory = await new this.Category(category).save();
    return newCategory;
  };

  editCategory: ICategoryService['editCategory'] = async (_id, category) => {
    const editedCategory = await this.Category.findOneAndUpdate(
      { _id },
      {
        $set: category,
      },
      { new: true },
    );

    return editedCategory;
  };

  deleteCategory: ICategoryService['deleteCategory'] = async (_id) => {
    const deletedCategory = await this.Category.findByIdAndDelete({ _id });
    return deletedCategory;
  };

  getCategories: ICategoryService['getCategories'] = async () => {
    const categories = await this.Category.aggregate([{ $match: {} }]);

    return categories;
  };

  isExist: ICategoryService['isExist'] = async (title, _id) => {
    if (_id) {
      return await this.isExistWithId(title, _id);
    }

    // check if there is a category document have same title (use for add new category)
    const category = await this.Category.findOne({
      title,
    });

    const result = category ? true : false;
    return result;
  };

  /*
   * check if there is a category document with deferent _id have same title (use for edit existing category)
  **/
  private isExistWithId: ICategoryService['isExist'] = async (title, _id) => {
    const category = await this.Category.findOne({
      _id: { $ne: { _id } },
      title,
    });

    const result = category ? true : false;
    return result;
  };
}
