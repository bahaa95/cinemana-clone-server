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
exports.GroupRouter = void 0;
var router_1 = require("@/static/router");
var verifyJwt_1 = require("@/middleware/verifyJwt");
var verifyRoles_1 = require("@/middleware/verifyRoles");
var limiter_1 = require("@/middleware/limiter");
var validateResource_1 = require("@/middleware/validateResource");
var administrators_1 = require("@/features/administrators");
var validation_1 = require("../validation");
var GroupRouter = /** @class */ (function (_super) {
    __extends(GroupRouter, _super);
    function GroupRouter(groupController) {
        var _this = _super.call(this, '/groups', groupController) || this;
        _this.initializeRoutes();
        return _this;
    }
    GroupRouter.prototype.initializeRoutes = function () {
        /**
         * * dashboard routes
         */
        // add new group
        this.router.post("/admin/dashboard".concat(this.path), verifyJwt_1.verifyJwt, (0, verifyRoles_1.verifyRoles)(administrators_1.AdministratorRoles.Admin, administrators_1.AdministratorRoles.Data_Admin), (0, validateResource_1.validateResource)(validation_1.addGroupSchema), this.controller.addGroup);
        // edit group
        this.router.patch("/admin/dashboard".concat(this.path, "/_id/:_id"), verifyJwt_1.verifyJwt, (0, verifyRoles_1.verifyRoles)(administrators_1.AdministratorRoles.Admin, administrators_1.AdministratorRoles.Data_Admin), (0, validateResource_1.validateResource)(validation_1.editGroupSchema), this.controller.editGroup);
        // delete group
        this.router.delete("/admin/dashboard".concat(this.path, "/_id/:_id"), verifyJwt_1.verifyJwt, (0, verifyRoles_1.verifyRoles)(administrators_1.AdministratorRoles.Admin, administrators_1.AdministratorRoles.Data_Admin), (0, validateResource_1.validateResource)(validation_1.deleteGroupSchema), this.controller.deleteGroup);
        // get groups
        this.router.get("/admin/dashboard".concat(this.path), verifyJwt_1.verifyJwt, (0, verifyRoles_1.verifyRoles)(administrators_1.AdministratorRoles.Admin, administrators_1.AdministratorRoles.Data_Admin, administrators_1.AdministratorRoles.Viewers), this.controller.getGroups);
        // get group with video
        this.router.get("/admin/dashboard".concat(this.path, "/_id/:_id"), verifyJwt_1.verifyJwt, (0, verifyRoles_1.verifyRoles)(administrators_1.AdministratorRoles.Admin, administrators_1.AdministratorRoles.Data_Admin, administrators_1.AdministratorRoles.Viewers), this.controller.getGroupWithVideos);
        /**
         * * client routes
         */
        // get group with videos
        this.router.get("".concat(this.path, "/_id/:_id"), (0, limiter_1.limiter)(), (0, validateResource_1.validateResource)(validation_1.getGroupAndVideosSchema), this.controller.getGroupWithVideos);
        // get groups with videos
        this.router.get("".concat(this.path), (0, limiter_1.limiter)({ max: 100 }), this.controller.getGroupsWithVideos);
    };
    return GroupRouter;
}(router_1.Router));
exports.GroupRouter = GroupRouter;
