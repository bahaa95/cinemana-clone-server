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
exports.AdminstratorRouter = void 0;
var express_1 = require("express");
var router_1 = require("@/static/router");
var validateResource_1 = require("@/middleware/validateResource");
var verifyJwt_1 = require("@/middleware/verifyJwt");
var verifyRoles_1 = require("@/middleware/verifyRoles");
var limiter_1 = require("@/middleware/limiter");
var validation_1 = require("../validation");
var roles_1 = require("../roles");
var AdminstratorRouter = /** @class */ (function (_super) {
    __extends(AdminstratorRouter, _super);
    function AdminstratorRouter(_adminstratorController) {
        var _this = _super.call(this) || this;
        _this.path = '/admin/dashboard/adminstrators';
        _this.router = (0, express_1.Router)();
        _this.adminstratorController = _adminstratorController;
        _this.initializeRoutes();
        return _this;
    }
    AdminstratorRouter.prototype.getRoutes = function () {
        return this.router;
    };
    AdminstratorRouter.prototype.initializeRoutes = function () {
        // signup
        this.router.post("".concat(this.path, "/signup"), (0, limiter_1.limiter)({ max: 6, windowMs: 1000 * 60 * 60 }), (0, validateResource_1.validateResource)(validation_1.signupSchema), this.adminstratorController.emailMustNotExistBefore, this.adminstratorController.signup);
        // signin
        this.router.post("".concat(this.path, "/signin"), (0, limiter_1.limiter)({ max: 10, windowMs: 1000 * 60 * 60 }), (0, validateResource_1.validateResource)(validation_1.signinSchema), this.adminstratorController.isEmailExist, this.adminstratorController.comparePassword, this.adminstratorController.isAccountActivated, this.adminstratorController.signin);
        // edit account
        this.router.patch("".concat(this.path, "/editAccount/:_id"), (0, limiter_1.limiter)({ max: 15, windowMs: 1000 * 60 * 60 }), verifyJwt_1.verifyJwt, (0, validateResource_1.validateResource)(validation_1.editAccountSchema), this.adminstratorController.editAccount);
        // toggle account activation
        this.router.patch("".concat(this.path, "/activation/:_id"), verifyJwt_1.verifyJwt, (0, verifyRoles_1.verifyRoles)(roles_1.AdministratorRoles.Admin), (0, validateResource_1.validateResource)(validation_1.toggleActivationSchema), this.adminstratorController.toggleActivated);
        // edit roles
        this.router.patch("".concat(this.path, "/roles/:_id"), verifyJwt_1.verifyJwt, (0, verifyRoles_1.verifyRoles)(roles_1.AdministratorRoles.Admin), (0, validateResource_1.validateResource)(validation_1.editRolesSchema), this.adminstratorController.editRoles);
        // get accounts
        this.router.get(this.path, verifyJwt_1.verifyJwt, (0, verifyRoles_1.verifyRoles)(roles_1.AdministratorRoles.Admin), this.adminstratorController.getAccounts);
        // refresh token
        this.router.post("".concat(this.path, "/refreshToken"), this.adminstratorController.refreshToken);
    };
    return AdminstratorRouter;
}(router_1.Router));
exports.AdminstratorRouter = AdminstratorRouter;
