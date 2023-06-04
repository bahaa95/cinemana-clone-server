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
exports.HistoryRouter = void 0;
var router_1 = require("@/static/router");
var limiter_1 = require("@/middleware/limiter");
var verifyJwt_1 = require("@/middleware/verifyJwt");
var validateResource_1 = require("@/middleware/validateResource");
var validation_1 = require("../validation");
var HistoryRouter = /** @class */ (function (_super) {
    __extends(HistoryRouter, _super);
    function HistoryRouter(historyController) {
        var _this = _super.call(this, '/history', historyController) || this;
        _this.initializeRoutes();
        return _this;
    }
    HistoryRouter.prototype.initializeRoutes = function () {
        // get history for video
        this.router.get("".concat(this.path, "/videoId/:videoId"), (0, limiter_1.limiter)({ max: 250 }), verifyJwt_1.verifyJwt, (0, validateResource_1.validateResource)(validation_1.getHistorySchema), this.controller.getHistory);
        // edit history
        this.router.patch(this.path, (0, limiter_1.limiter)(), verifyJwt_1.verifyJwt, (0, validateResource_1.validateResource)(validation_1.editHistorySchema), this.controller.editHistory);
        // get favorites videos
        this.router.get("".concat(this.path, "/favorites"), (0, limiter_1.limiter)({ max: 100 }), verifyJwt_1.verifyJwt, this.controller.getFavoriteVideos);
        // get watch list
        this.router.get("".concat(this.path, "/watchList"), (0, limiter_1.limiter)({ max: 100 }), verifyJwt_1.verifyJwt, this.controller.getWatchList);
    };
    return HistoryRouter;
}(router_1.Router));
exports.HistoryRouter = HistoryRouter;
