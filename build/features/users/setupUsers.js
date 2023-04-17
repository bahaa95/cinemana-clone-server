"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupUsers = void 0;
var router_1 = require("./router");
var controller_1 = require("./controller");
var service_1 = require("./service");
var model_1 = require("./model");
function setupUsers() {
    var router = new router_1.UserRouter(new controller_1.UserController(new service_1.UserService(model_1.User)));
    return router.getRoutes();
}
exports.setupUsers = setupUsers;
