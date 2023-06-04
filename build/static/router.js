"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
var express_1 = require("express");
var Router = /** @class */ (function () {
    function Router(path, controller) {
        var _this = this;
        this.getRoutes = function () { return _this.router; };
        this.path = path;
        this.router = (0, express_1.Router)();
        this.controller = controller;
    }
    return Router;
}());
exports.Router = Router;
