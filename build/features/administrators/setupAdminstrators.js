"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAdministrators = void 0;
var router_1 = require("./router");
var controller_1 = require("./controller");
var service_1 = require("./service");
var model_1 = require("./model");
function setupAdministrators() {
    var router = new router_1.AdminstratorRouter(new controller_1.AdminstratorController(new service_1.AdministratorService(model_1.Administrator)));
    return router.getRoutes();
}
exports.setupAdministrators = setupAdministrators;
