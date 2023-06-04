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
exports.EpisodeRouter = void 0;
var router_1 = require("@/static/router");
var verifyJwt_1 = require("@/middleware/verifyJwt");
var verifyRoles_1 = require("@/middleware/verifyRoles");
var handleUploadedFiles_1 = require("@/middleware/handleUploadedFiles");
var validateFile_1 = require("@/middleware/validateFile");
var validateResource_1 = require("@/middleware/validateResource");
var validation_1 = require("../validation");
var administrators_1 = require("@/features/administrators");
var EpisodeRouter = /** @class */ (function (_super) {
    __extends(EpisodeRouter, _super);
    function EpisodeRouter(epidoesController) {
        var _this = _super.call(this, '/admin/dashboard/episodes', epidoesController) || this;
        _this.initializeRoutes();
        return _this;
    }
    EpisodeRouter.prototype.initializeRoutes = function () {
        // * add new episode
        this.router.post(this.path, verifyJwt_1.verifyJwt, (0, verifyRoles_1.verifyRoles)(administrators_1.AdministratorRoles.Admin, administrators_1.AdministratorRoles.Data_Admin), (0, handleUploadedFiles_1.handleSingleImage)('image'), (0, validateFile_1.ValidateFile)('There is no image file. please upload image for episode.'), (0, validateResource_1.validateResource)(validation_1.addEpisodeSchema), this.controller.addEpisode);
        // * edit episode
        this.router.patch("".concat(this.path, "/:_id"), verifyJwt_1.verifyJwt, (0, verifyRoles_1.verifyRoles)(administrators_1.AdministratorRoles.Admin, administrators_1.AdministratorRoles.Data_Admin), (0, handleUploadedFiles_1.handleSingleImage)('image'), (0, validateResource_1.validateResource)(validation_1.editEpisodeSchema), this.controller.editEpisode);
        // * delete episode
        this.router.delete("".concat(this.path, "/:_id"), verifyJwt_1.verifyJwt, (0, verifyRoles_1.verifyRoles)(administrators_1.AdministratorRoles.Admin, administrators_1.AdministratorRoles.Data_Admin), (0, validateResource_1.validateResource)(validation_1.deleteEpisodeSchema), this.controller.deleteEpisode);
    };
    return EpisodeRouter;
}(router_1.Router));
exports.EpisodeRouter = EpisodeRouter;
