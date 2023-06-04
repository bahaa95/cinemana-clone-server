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
exports.SeasonRouter = void 0;
var router_1 = require("@/static/router");
var verifyJwt_1 = require("@/middleware/verifyJwt");
var verifyRoles_1 = require("@/middleware/verifyRoles");
var administrators_1 = require("@/features/administrators");
var validateResource_1 = require("@/middleware/validateResource");
var validation_1 = require("../validation");
var SeasonRouter = /** @class */ (function (_super) {
    __extends(SeasonRouter, _super);
    function SeasonRouter(seasonController) {
        var _this = _super.call(this, '/admin/dashboard/seasons', seasonController) || this;
        _this.initializeRoutes();
        return _this;
    }
    SeasonRouter.prototype.initializeRoutes = function () {
        // * add new season
        this.router.post(this.path, verifyJwt_1.verifyJwt, (0, verifyRoles_1.verifyRoles)(administrators_1.AdministratorRoles.Admin, administrators_1.AdministratorRoles.Data_Admin), (0, validateResource_1.validateResource)(validation_1.addSeasonSchema), this.controller.mustBeSeries, this.controller.addSeason);
        // * edit season
        this.router.patch("".concat(this.path, "/:_id"), verifyJwt_1.verifyJwt, (0, verifyRoles_1.verifyRoles)(administrators_1.AdministratorRoles.Admin, administrators_1.AdministratorRoles.Data_Admin), (0, validateResource_1.validateResource)(validation_1.editSeasonSchema), this.controller.editSeason);
        // * delete season
        this.router.delete("".concat(this.path, "/:_id"), verifyJwt_1.verifyJwt, (0, verifyRoles_1.verifyRoles)(administrators_1.AdministratorRoles.Admin, administrators_1.AdministratorRoles.Data_Admin), (0, validateResource_1.validateResource)(validation_1.deleteSeasonSchema), this.controller.deleteSeason);
        // * get all seasons
        this.router.get(this.path, verifyJwt_1.verifyJwt, (0, verifyRoles_1.verifyRoles)(administrators_1.AdministratorRoles.Admin, administrators_1.AdministratorRoles.Data_Admin), this.controller.getSeasons);
    };
    return SeasonRouter;
}(router_1.Router));
exports.SeasonRouter = SeasonRouter;
