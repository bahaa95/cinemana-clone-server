"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupGroups = void 0;
var router_1 = require("./router");
var controller_1 = require("./controller");
var service_1 = require("./service");
var model_1 = require("./model");
function setupGroups() {
    var router = new router_1.GroupRouter(new controller_1.GroupController(new service_1.GroupService(model_1.Group)));
    return router.getRoutes();
}
exports.setupGroups = setupGroups;
