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
exports.UserRouter = void 0;
var express_1 = require("express");
var router_1 = require("@/static/router");
var validateResource_1 = require("@/middleware/validateResource");
var limiter_1 = require("@/middleware/limiter");
var verifyJwt_1 = require("@/middleware/verifyJwt");
var vlaidation_1 = require("../vlaidation");
var UserRouter = /** @class */ (function (_super) {
    __extends(UserRouter, _super);
    function UserRouter(_usersController) {
        var _this = _super.call(this) || this;
        _this.path = '/users';
        _this.router = (0, express_1.Router)();
        _this.usersController = _usersController;
        _this.initializeRoutes();
        return _this;
    }
    UserRouter.prototype.getRoutes = function () {
        return this.router;
    };
    UserRouter.prototype.initializeRoutes = function () {
        // signup
        this.router.post("".concat(this.path, "/signUp"), (0, limiter_1.limiter)({
            max: 6,
            windowMs: 1000 * 60 * 60,
        }), (0, validateResource_1.validateResource)(vlaidation_1.signupSchema), this.usersController.signUp);
        // signin
        this.router.post("".concat(this.path, "/signIn"), (0, limiter_1.limiter)({
            max: 10,
            windowMs: 1000 * 60 * 60,
        }), (0, validateResource_1.validateResource)(vlaidation_1.signinSchema), this.usersController.signIn);
        // log out
        this.router.post("".concat(this.path, "/logOut"), (0, limiter_1.limiter)({
            max: 10,
            windowMs: 1000 * 60 * 60,
        }), verifyJwt_1.verifyJwt, this.usersController.logOut);
        // refresh token
        this.router.post("".concat(this.path, "/refreshToken"), (0, limiter_1.limiter)({
            max: 60,
            windowMs: 1000 * 60 * 20,
        }), this.usersController.refreshToken);
    };
    return UserRouter;
}(router_1.Router));
exports.UserRouter = UserRouter;
