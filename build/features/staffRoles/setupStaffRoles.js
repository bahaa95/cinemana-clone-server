"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupStaffRoles = void 0;
var router_1 = require("./router");
var controller_1 = require("./controller");
var service_1 = require("./service");
var model_1 = require("./model");
function setupStaffRoles() {
    var router = new router_1.StaffRoleRouter(new controller_1.StaffRoleController(new service_1.StaffRoleService(model_1.StaffRole)));
    return router.getRoutes();
}
exports.setupStaffRoles = setupStaffRoles;
