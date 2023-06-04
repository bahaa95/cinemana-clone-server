"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRouter = void 0;
var router_1 = require("@/static/router");
var validateResource_1 = require("@/middleware/validateResource");
var limiter_1 = require("@/middleware/limiter");
var verifyJwt_1 = require("@/middleware/verifyJwt");
var verifyRoles_1 = require("@/middleware/verifyRoles");
var validation_1 = require("../validation");
var administrators_1 = require("@/features/administrators");
var CategoryRouter = /** @class */ (function (_super) {
    __extends(CategoryRouter, _super);
    function CategoryRouter(categoryController) {
        var _this = _super.call(this, '/categories', categoryController) || this;
        _this.initializeRoutes();
        return _this;
    }
    CategoryRouter.prototype.initializeRoutes = function () {
        /**
         * * dashboard
         */
        // * add new category
        this.router.post("/admin/dashboard".concat(this.path), verifyJwt_1.verifyJwt, (0, verifyRoles_1.verifyRoles)(administrators_1.AdministratorRoles.Admin, administrators_1.AdministratorRoles.Data_Admin), (0, validateResource_1.validateResource)(validation_1.addCategorySchema), this.controller.addCategory);
        // * edit category
        this.router.patch("/admin/dashboard".concat(this.path, "/:_id"), verifyJwt_1.verifyJwt, (0, verifyRoles_1.verifyRoles)(administrators_1.AdministratorRoles.Admin, administrators_1.AdministratorRoles.Data_Admin), (0, validateResource_1.validateResource)(validation_1.editCategorySchema), this.controller.editCategory);
        // * delete category
        this.router.delete("/admin/dashboard".concat(this.path, "/:_id"), verifyJwt_1.verifyJwt, (0, verifyRoles_1.verifyRoles)(administrators_1.AdministratorRoles.Admin, administrators_1.AdministratorRoles.Data_Admin), (0, validateResource_1.validateResource)(validation_1.deleteCategorySchema), this.controller.deleteCategory);
        // * get categories
        this.router.get("/admin/dashboard".concat(this.path), verifyJwt_1.verifyJwt, (0, verifyRoles_1.verifyRoles)(administrators_1.AdministratorRoles.Admin, administrators_1.AdministratorRoles.Data_Admin, administrators_1.AdministratorRoles.Viewers), this.controller.getCategories);
        /**
         * * cinemana client
         */
        // * get categories
        this.router.get(this.path, (0, limiter_1.limiter)({ max: 100 }), this.controller.getCategories);
    };
    return CategoryRouter;
}(router_1.Router));
exports.CategoryRouter = CategoryRouter;
