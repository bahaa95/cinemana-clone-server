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
exports.VideoRouter = void 0;
var express_1 = require("express");
var router_1 = require("@/static/router");
var limiter_1 = require("@/middleware/limiter");
var verifyJwt_1 = require("@/middleware/verifyJwt");
var verifyRoles_1 = require("@/middleware/verifyRoles");
var handleUploadedFiles_1 = require("@/middleware/handleUploadedFiles");
var validateFile_1 = require("@/middleware/validateFile");
var validateResource_1 = require("@/middleware/validateResource");
var validation_1 = require("../validation/validation");
var administrators_1 = require("@/features/administrators");
var VideoRouter = /** @class */ (function (_super) {
    __extends(VideoRouter, _super);
    function VideoRouter(_videoController) {
        var _this = _super.call(this) || this;
        _this.path = '';
        _this.router = (0, express_1.Router)();
        _this.videoController = _videoController;
        _this.initializeRoutes();
        return _this;
    }
    VideoRouter.prototype.getRoutes = function () {
        return this.router;
    };
    VideoRouter.prototype.initializeRoutes = function () {
        /**
         * * dashbord
         */
        // add new video
        this.router.post('/admin/dashboard/videos', verifyJwt_1.verifyJwt, (0, verifyRoles_1.verifyRoles)(administrators_1.AdministratorRoles.Admin, administrators_1.AdministratorRoles.Data_Admin), (0, handleUploadedFiles_1.handleImages)([
            { name: 'poster', maxCount: 1 },
            { name: 'cover', maxCount: 1 },
        ]), (0, validateFile_1.ValidateFiles)('poster', 'cover'), (0, validateResource_1.validateResource)(validation_1.addVideoSchema), this.videoController.addVideo);
        // delete video
        this.router.delete('/admin/dashboard/videos/:_id', verifyJwt_1.verifyJwt, (0, verifyRoles_1.verifyRoles)(administrators_1.AdministratorRoles.Admin, administrators_1.AdministratorRoles.Data_Admin), (0, validateResource_1.validateResource)(validation_1.deleteVideoSchema), this.videoController.deleteVideo);
        // edit video
        this.router.patch('/admin/dashboard/videos/:_id', verifyJwt_1.verifyJwt, (0, verifyRoles_1.verifyRoles)(administrators_1.AdministratorRoles.Admin, administrators_1.AdministratorRoles.Data_Admin), (0, handleUploadedFiles_1.handleImages)([
            { name: 'poster', maxCount: 1 },
            { name: 'cover', maxCount: 1 },
        ]), (0, validateResource_1.validateResource)(validation_1.editVideoSchema), this.videoController.editVideo);
        // get video
        this.router.get('/admin/dashboard/videos/:_id', verifyJwt_1.verifyJwt, (0, verifyRoles_1.verifyRoles)(administrators_1.AdministratorRoles.Admin, administrators_1.AdministratorRoles.Data_Admin, administrators_1.AdministratorRoles.Viewers), (0, validateResource_1.validateResource)(validation_1.getVideoSchema), this.videoController.getVideo);
        /**
         * * client
         */
        // get video
        this.router.get('/video/_id/:_id', (0, limiter_1.limiter)(), (0, validateResource_1.validateResource)(validation_1.getVideoSchema), this.videoController.getVideo);
        // get movies
        this.router.get('/movies', (0, limiter_1.limiter)(), (0, validateResource_1.validateResource)(validation_1.getMoviesSchema), this.videoController.getMovies);
        // get series
        this.router.get('/series', (0, limiter_1.limiter)(), (0, validateResource_1.validateResource)(validation_1.getSeriesSchema), this.videoController.getSeries);
        // get special videos
        this.router.get('/specials', (0, limiter_1.limiter)({ max: 100 }), this.videoController.getSpecialVideos);
        // search
        this.router.get('/search', (0, limiter_1.limiter)({ max: 1000 }), (0, validateResource_1.validateResource)(validation_1.searchSchema), this.videoController.searchVideo);
    };
    return VideoRouter;
}(router_1.Router));
exports.VideoRouter = VideoRouter;
