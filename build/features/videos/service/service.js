"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoService = void 0;
var convertToObjectId_1 = require("@/utils/convertToObjectId");
var query_1 = require("./query");
// ! don't return the value for private method to clients and admins it's for internal usage only.
// ! only return the value for public methods.
var VideoService = /** @class */ (function () {
    function VideoService(_VideoModel) {
        var _this = this;
        /**
         * @access private
         */
        this.addVideo = function (video) { return __awaiter(_this, void 0, void 0, function () {
            var newVideo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new this.Video(video).save()];
                    case 1:
                        newVideo = _a.sent();
                        return [2 /*return*/, newVideo];
                }
            });
        }); };
        /**
         * @access public dashboard
         */
        this.editVideo = function (_id, video) { return __awaiter(_this, void 0, void 0, function () {
            var editedVideo, videoItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.Video.findOneAndUpdate({ _id: _id }, {
                            $set: video,
                        }, { select: { _id: 1 } })];
                    case 1:
                        editedVideo = _a.sent();
                        if (!editedVideo)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, this.getVideoListItem(editedVideo._id)];
                    case 2:
                        videoItem = _a.sent();
                        if (!videoItem)
                            return [2 /*return*/, null];
                        return [2 /*return*/, videoItem];
                }
            });
        }); };
        /**
         * @access public dashboard
         */
        this.deleteVideo = function (_id) { return __awaiter(_this, void 0, void 0, function () {
            var video;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getVideoListItem(_id)];
                    case 1:
                        video = _a.sent();
                        if (!video)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, this.Video.findOneAndDelete({ _id: _id })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, video];
                }
            });
        }); };
        /**
         * @access public dashboard, cinmana client
         */
        this.getFullVideoDocument = function (query) { return __awaiter(_this, void 0, void 0, function () {
            var videoDocument, piplineStages, video;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getBasicVideoDocument(query._id)];
                    case 1:
                        videoDocument = _a.sent();
                        piplineStages = [
                            { $match: query },
                            // lookup to categories
                            {
                                $lookup: query_1.lookupMainCategory,
                            },
                            // lookup to categories
                            {
                                $lookup: query_1.lookupToCategories,
                            },
                            // lookup to staff to get actors
                            {
                                $lookup: query_1.lookupActors,
                            },
                            // lookup to staff to get directors
                            {
                                $lookup: query_1.lookupDirectors,
                            },
                            // lookup to staff to get writers
                            {
                                $lookup: query_1.lookupWriters,
                            },
                            { $project: { __v: 0 } },
                            { $unwind: '$mainCategory' },
                        ];
                        // add lookup to season stage if video is series type
                        if ((videoDocument === null || videoDocument === void 0 ? void 0 : videoDocument.type) === 'series') {
                            piplineStages = __spreadArray(__spreadArray([], piplineStages, true), [
                                {
                                    $lookup: query_1.lookupToSeasons,
                                },
                            ], false);
                        }
                        return [4 /*yield*/, this.Video.aggregate(__spreadArray([], piplineStages, true))];
                    case 2:
                        video = (_a.sent())[0];
                        if (!video)
                            return [2 /*return*/, null];
                        return [2 /*return*/, video];
                }
            });
        }); };
        /**
         * @access public cinmana client
         */
        this.getSimilarVideos = function (query) { return __awaiter(_this, void 0, void 0, function () {
            var similarVideos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.Video.aggregate([
                            { $match: query },
                            { $sample: { size: 25 } },
                            { $project: __assign({}, query_1.projectVideoListItem) },
                            { $lookup: query_1.lookupMainCategory },
                            { $unwind: '$mainCategory' },
                        ])];
                    case 1:
                        similarVideos = _a.sent();
                        return [2 /*return*/, similarVideos];
                }
            });
        }); };
        /**
         * @access public cinmana client
         */
        this.getMovies = function (query) { return __awaiter(_this, void 0, void 0, function () {
            var movies;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.Video.aggregate([
                            { $match: __assign({ type: 'movie', isPublic: true }, query) },
                            { $lookup: query_1.lookupMainCategory },
                            {
                                $project: query_1.projectVideoListItem,
                            },
                            { $unwind: '$mainCategory' },
                            { $sort: { releaseDate: -1 } },
                        ])];
                    case 1:
                        movies = _a.sent();
                        return [2 /*return*/, movies];
                }
            });
        }); };
        /**
         * @access public cinmana client
         */
        this.getSeries = function (query) { return __awaiter(_this, void 0, void 0, function () {
            var series;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.Video.aggregate([
                            { $match: __assign({ type: 'series', isPublic: true }, query) },
                            { $lookup: query_1.lookupMainCategory },
                            {
                                $project: query_1.projectVideoListItem,
                            },
                            { $unwind: '$mainCategory' },
                            { $sort: { releaseDate: -1 } },
                        ])];
                    case 1:
                        series = _a.sent();
                        return [2 /*return*/, series];
                }
            });
        }); };
        /**
         * @access public cinmana client
         */
        this.getSpecialVideos = function () { return __awaiter(_this, void 0, void 0, function () {
            var specialVideos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.Video.aggregate([
                            {
                                $match: {
                                    isPublic: true,
                                    isSpecial: true,
                                    specialExpire: { $gte: new Date() },
                                },
                            },
                            {
                                $project: {
                                    _id: 1,
                                    title: 1,
                                    description: 1,
                                    stars: 1,
                                    cover: 1,
                                    uploadDate: 1,
                                },
                            },
                            { $sort: { uploadDate: -1 } },
                        ])];
                    case 1:
                        specialVideos = _a.sent();
                        return [2 /*return*/, specialVideos];
                }
            });
        }); };
        /**
         * @access public cinmana client
         */
        this.searchVideo = function (query) { return __awaiter(_this, void 0, void 0, function () {
            var videos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.Video.aggregate([
                            { $match: __assign({ isPublic: true }, query) },
                            { $project: query_1.projectVideoListItem },
                            {
                                $lookup: query_1.lookupMainCategory,
                            },
                            { $unwind: '$mainCategory' },
                            { $sort: { releaseDate: -1 } },
                        ])];
                    case 1:
                        videos = _a.sent();
                        return [2 /*return*/, videos];
                }
            });
        }); };
        /**
         * @access private
         */
        this.getBasicVideoDocument = function (_id) { return __awaiter(_this, void 0, void 0, function () {
            var video;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.Video.aggregate([
                            { $match: { _id: _id } },
                        ])];
                    case 1:
                        video = (_a.sent())[0];
                        if (!video)
                            return [2 /*return*/, null];
                        return [2 /*return*/, video];
                }
            });
        }); };
        /**
         * @access private
         */
        this.getVideoListItem = function (_id) { return __awaiter(_this, void 0, void 0, function () {
            var video;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.Video.aggregate([
                            { $match: { _id: (0, convertToObjectId_1.convertToObjectId)(_id) } },
                            {
                                $project: query_1.projectVideoListItem,
                            },
                            {
                                $lookup: query_1.lookupMainCategory,
                            },
                            { $unwind: '$mainCategory' },
                        ])];
                    case 1:
                        video = (_a.sent())[0];
                        if (!video)
                            return [2 /*return*/, null];
                        return [2 /*return*/, video];
                }
            });
        }); };
        this.Video = _VideoModel;
    }
    return VideoService;
}());
exports.VideoService = VideoService;
