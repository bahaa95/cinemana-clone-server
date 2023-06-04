"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupCategories = void 0;
var router_1 = require("./router");
var controller_1 = require("./controller");
var service_1 = require("./service");
var model_1 = require("./model");
function setupCategories() {
    var router = new router_1.CategoryRouter(new controller_1.CategoryController(new service_1.CategoryService(model_1.Category)));
    return router.getRoutes();
}
exports.setupCategories = setupCategories;
