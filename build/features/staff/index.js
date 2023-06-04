"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupStaff = exports.lookupToRolesQuery = void 0;
var router_1 = require("./router");
var controller_1 = require("./controller");
var service_1 = require("./service");
var model_1 = require("./model");
var query_1 = require("./service/query");
Object.defineProperty(exports, "lookupToRolesQuery", { enumerable: true, get: function () { return query_1.lookupToRoles; } });
function setupStaff() {
    var router = new router_1.StaffRouter(new controller_1.StaffController(new service_1.StaffService(model_1.Staff)));
    return router.getRoutes();
}
exports.setupStaff = setupStaff;
