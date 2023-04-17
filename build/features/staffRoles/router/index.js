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
exports.StaffRoleRouter = void 0;
var express_1 = require("express");
var router_1 = require("@/static/router");
var validateResource_1 = require("@/middleware/validateResource");
var verifyJwt_1 = require("@/middleware/verifyJwt");
var verifyRoles_1 = require("@/middleware/verifyRoles");
var validation_1 = require("../validation");
var administrators_1 = require("@/features/administrators");
var StaffRoleRouter = /** @class */ (function (_super) {
    __extends(StaffRoleRouter, _super);
    function StaffRoleRouter(_controller) {
        var _this = _super.call(this) || this;
        _this.path = '/admin/dashboard/staff/roles';
        _this.router = (0, express_1.Router)();
        _this.staffRoleController = _controller;
        _this.initializeRoutes();
        return _this;
    }
    StaffRoleRouter.prototype.getRoutes = function () {
        return this.router;
    };
    StaffRoleRouter.prototype.initializeRoutes = function () {
        // new role
        this.router.post(this.path, verifyJwt_1.verifyJwt, (0, verifyRoles_1.verifyRoles)(administrators_1.AdministratorRoles.Admin, administrators_1.AdministratorRoles.Data_Admin), (0, validateResource_1.validateResource)(validation_1.addRoleSchema), this.staffRoleController.addRole);
        // edit role
        this.router.put("".concat(this.path, "/:_id"), verifyJwt_1.verifyJwt, (0, verifyRoles_1.verifyRoles)(administrators_1.AdministratorRoles.Admin, administrators_1.AdministratorRoles.Data_Admin), (0, validateResource_1.validateResource)(validation_1.editRoleSchema), this.staffRoleController.editRole);
        // delete role
        this.router.delete("".concat(this.path, "/:_id"), verifyJwt_1.verifyJwt, (0, verifyRoles_1.verifyRoles)(administrators_1.AdministratorRoles.Admin, administrators_1.AdministratorRoles.Data_Admin), (0, validateResource_1.validateResource)(validation_1.deleteRoleSchema), this.staffRoleController.deleteRole);
        // get roles
        this.router.get(this.path, verifyJwt_1.verifyJwt, (0, verifyRoles_1.verifyRoles)(administrators_1.AdministratorRoles.Admin, administrators_1.AdministratorRoles.Data_Admin, administrators_1.AdministratorRoles.Viewers), this.staffRoleController.getRoles);
    };
    return StaffRoleRouter;
}(router_1.Router));
exports.StaffRoleRouter = StaffRoleRouter;
