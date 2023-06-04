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
exports.StaffRouter = void 0;
var router_1 = require("@/static/router");
var handleUploadedFiles_1 = require("@/middleware/handleUploadedFiles");
var validateFile_1 = require("@/middleware/validateFile");
var validateResource_1 = require("@/middleware/validateResource");
var verifyJwt_1 = require("@/middleware/verifyJwt");
var verifyRoles_1 = require("@/middleware/verifyRoles");
var limiter_1 = require("@/middleware/limiter");
var validation_1 = require("../validation");
var administrators_1 = require("@/features/administrators");
var StaffRouter = /** @class */ (function (_super) {
    __extends(StaffRouter, _super);
    function StaffRouter(staffController) {
        var _this = _super.call(this, '/staff/person', staffController) || this;
        _this.initializeRoutes();
        return _this;
    }
    StaffRouter.prototype.initializeRoutes = function () {
        /**
         * * dashboard
         */
        // add person to staff
        this.router.post("/admin/dashboard".concat(this.path), verifyJwt_1.verifyJwt, (0, verifyRoles_1.verifyRoles)(administrators_1.AdministratorRoles.Admin, administrators_1.AdministratorRoles.Data_Admin), (0, handleUploadedFiles_1.handleSingleImage)('image'), (0, validateFile_1.ValidateFile)(), (0, validateResource_1.validateResource)(validation_1.addStaffSchema), this.controller.addPerson);
        // edit person
        this.router.patch("/admin/dashboard".concat(this.path, "/:_id"), verifyJwt_1.verifyJwt, (0, verifyRoles_1.verifyRoles)(administrators_1.AdministratorRoles.Admin, administrators_1.AdministratorRoles.Data_Admin), (0, handleUploadedFiles_1.handleSingleImage)('image'), (0, validateResource_1.validateResource)(validation_1.editStaffSchema), this.controller.editPerson);
        // delete person
        this.router.delete("/admin/dashboard".concat(this.path, "/:_id"), verifyJwt_1.verifyJwt, (0, verifyRoles_1.verifyRoles)(administrators_1.AdministratorRoles.Admin, administrators_1.AdministratorRoles.Data_Admin), (0, validateResource_1.validateResource)(validation_1.deleteStaffSchema), this.controller.deletePerson);
        // get staff
        this.router.get("/admin/dashboard".concat(this.path), verifyJwt_1.verifyJwt, (0, verifyRoles_1.verifyRoles)(administrators_1.AdministratorRoles.Admin, administrators_1.AdministratorRoles.Data_Admin, administrators_1.AdministratorRoles.Viewers), this.controller.getStaff);
        // get staff by role
        this.router.get("/admin/dashboard".concat(this.path, "/roleId/:roleId"), verifyJwt_1.verifyJwt, (0, verifyRoles_1.verifyRoles)(administrators_1.AdministratorRoles.Admin, administrators_1.AdministratorRoles.Data_Admin, administrators_1.AdministratorRoles.Viewers), (0, validateResource_1.validateResource)(validation_1.getStaffByRoleSchema), this.controller.getStaffByRole);
        // get person
        this.router.get("/admin/dashboard".concat(this.path, "/search"), verifyJwt_1.verifyJwt, (0, verifyRoles_1.verifyRoles)(administrators_1.AdministratorRoles.Admin, administrators_1.AdministratorRoles.Data_Admin, administrators_1.AdministratorRoles.Viewers), (0, validateResource_1.validateResource)(validation_1.getPersonSchema), this.controller.getPerson);
        /**
         * * cinemana-client
         */
        // get person and videos
        this.router.get("".concat(this.path, "/:_id"), (0, limiter_1.limiter)(), (0, validateResource_1.validateResource)(validation_1.getPersonAndVideosSchema), this.controller.getPersonAndVideos);
    };
    return StaffRouter;
}(router_1.Router));
exports.StaffRouter = StaffRouter;
