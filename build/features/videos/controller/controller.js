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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoController = void 0;
var mediaService_1 = require("@/lib/mediaService");
var httperror_1 = require("@/lib/httperror");
var convertToObjectId_1 = require("@/utils/convertToObjectId");
var jsonParseVideo_1 = require("../utils/jsonParseVideo");
var VideoController = /** @class */ (function () {
    function VideoController(_videoService, _seasonService, _episodeService) {
        var _this = this;
        this.addVideo = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var data, newVideo, files, _a, poster, cover, editedVideo, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        data = (0, jsonParseVideo_1.jsonParseVideo)(req.body);
                        return [4 /*yield*/, this.videoService.addVideo(data)];
                    case 1:
                        newVideo = _b.sent();
                        files = req.files;
                        return [4 /*yield*/, mediaService_1.mediaService.uploadMany(files['poster'][0], files['cover'][0])];
                    case 2:
                        _a = _b.sent(), poster = _a[0], cover = _a[1];
                        return [4 /*yield*/, this.videoService.editVideo(newVideo._id, {
                                poster: poster,
                                cover: cover,
                            })];
                    case 3:
                        editedVideo = _b.sent();
                        res.status(201).json(editedVideo);
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _b.sent();
                        next(error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.deleteVideo = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _id, video, deletedVideo, episodes, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        _id = (0, convertToObjectId_1.convertToObjectId)(req.params._id);
                        return [4 /*yield*/, this.videoService.getBasicVideoDocument(_id)];
                    case 1:
                        video = _a.sent();
                        // throw HttpError if video not found
                        if (!video) {
                            throw new httperror_1.HttpError({
                                status: httperror_1.statuses.Not_Found,
                                message: "Video with id ".concat(_id, " not found."),
                                feature: 'videos',
                            });
                        }
                        return [4 /*yield*/, this.videoService.deleteVideo(_id)];
                    case 2:
                        deletedVideo = _a.sent();
                        // delete poster and cover for video from mediaService
                        return [4 /*yield*/, mediaService_1.mediaService.delete(video.poster.publicId)];
                    case 3:
                        // delete poster and cover for video from mediaService
                        _a.sent();
                        return [4 /*yield*/, mediaService_1.mediaService.delete(video.cover.publicId)];
                    case 4:
                        _a.sent();
                        // return response if video type is movie
                        if (video.type === 'movie') {
                            res.status(200).json(deletedVideo);
                            return [2 /*return*/];
                        }
                        // if video type is series delete its seasons and episodes
                        // delete seasons for video
                        return [4 /*yield*/, this.seasonService.deleteVideoSeasons(video._id)];
                    case 5:
                        // if video type is series delete its seasons and episodes
                        // delete seasons for video
                        _a.sent();
                        return [4 /*yield*/, this.episodeService.deleteVideoEpisodes(video._id)];
                    case 6:
                        episodes = _a.sent();
                        // delete images for episodes
                        episodes.forEach(function (episode) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, mediaService_1.mediaService.delete(episode.image.publicId)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); });
                        // return response
                        res.status(200).json(deletedVideo);
                        return [3 /*break*/, 8];
                    case 7:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.editVideo = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _id, data, files, video, editedVideo, poster, cover, editedVideo2, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        _id = (0, convertToObjectId_1.convertToObjectId)(req.params._id);
                        data = (0, jsonParseVideo_1.jsonParseVideo)(req.body);
                        files = req.files;
                        return [4 /*yield*/, this.videoService.getBasicVideoDocument(_id)];
                    case 1:
                        video = _a.sent();
                        // throw HttpError if video not found
                        if (!video) {
                            throw new httperror_1.HttpError({
                                status: httperror_1.statuses.Not_Found,
                                message: "Video with id ".concat(_id, " not found."),
                                feature: 'videos',
                            });
                        }
                        return [4 /*yield*/, this.videoService.editVideo(_id, data)];
                    case 2:
                        editedVideo = _a.sent();
                        // return response if there is no poster and cover files to update
                        if (!files['poster'] && !files['cover']) {
                            res.status(200).json(editedVideo);
                            return [2 /*return*/];
                        }
                        poster = void 0;
                        cover = void 0;
                        if (!files['poster']) return [3 /*break*/, 4];
                        return [4 /*yield*/, mediaService_1.mediaService.update(video.poster.publicId, files['poster'][0])];
                    case 3:
                        poster = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!files['cover']) return [3 /*break*/, 6];
                        return [4 /*yield*/, mediaService_1.mediaService.update(video.cover.publicId, files['cover'][0])];
                    case 5:
                        cover = _a.sent();
                        _a.label = 6;
                    case 6: return [4 /*yield*/, this.videoService.editVideo(_id, {
                            poster: poster || video.poster,
                            cover: cover || video.cover,
                        })];
                    case 7:
                        editedVideo2 = _a.sent();
                        res.status(200).json(editedVideo2);
                        return [3 /*break*/, 9];
                    case 8:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        this.getVideo = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _id, filterQuery, isClient, video, basicVideoDocument, similarVideos, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        _id = (0, convertToObjectId_1.convertToObjectId)(req.params._id);
                        filterQuery = { _id: (0, convertToObjectId_1.convertToObjectId)(_id) };
                        isClient = !req.originalUrl.split('/').includes('admin');
                        // get only public videos (isPublic=true) if the request for client
                        if (isClient) {
                            filterQuery.isPublic = true;
                        }
                        return [4 /*yield*/, this.videoService.getFullVideoDocument(filterQuery)];
                    case 1:
                        video = _a.sent();
                        // throw HttpError if video not found
                        if (!video) {
                            throw new httperror_1.HttpError({
                                status: httperror_1.statuses.Not_Found,
                                message: "Video with id ".concat(_id, " not found."),
                                feature: 'videos',
                            });
                        }
                        return [4 /*yield*/, this.videoService.getBasicVideoDocument(_id)];
                    case 2:
                        basicVideoDocument = (_a.sent());
                        return [4 /*yield*/, this.videoService.getSimilarVideos({
                                $and: [
                                    { isPublic: true },
                                    { type: basicVideoDocument.type },
                                    { _id: { $ne: basicVideoDocument._id } },
                                    { mainCategory: { $in: basicVideoDocument.categories } },
                                ],
                            })];
                    case 3:
                        similarVideos = _a.sent();
                        res.status(200).json({ video: video, similarVideos: similarVideos });
                        return [3 /*break*/, 5];
                    case 4:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.getMovies = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var categoryId, query, movies, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        categoryId = req.query.categoryId;
                        query = void 0;
                        if (categoryId)
                            query = __assign(__assign({}, query), { categories: (0, convertToObjectId_1.convertToObjectId)(categoryId) });
                        return [4 /*yield*/, this.videoService.getMovies(query)];
                    case 1:
                        movies = _a.sent();
                        res.status(200).json(movies);
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        next(error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getSeries = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var categoryId, query, series, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        categoryId = req.query.categoryId;
                        query = void 0;
                        if (categoryId)
                            query = __assign(__assign({}, query), { categories: (0, convertToObjectId_1.convertToObjectId)(categoryId) });
                        return [4 /*yield*/, this.videoService.getSeries(query)];
                    case 1:
                        series = _a.sent();
                        res.status(200).json(series);
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        next(error_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getSpecialVideos = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var specialVideos, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.videoService.getSpecialVideos()];
                    case 1:
                        specialVideos = _a.sent();
                        res.status(200).json(specialVideos);
                        return [3 /*break*/, 3];
                    case 2:
                        error_7 = _a.sent();
                        next(error_7);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.searchVideo = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, title, type, category, stars, year, query, _b, fromYear, toYear, searchResults, error_8;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _a = req.query, title = _a.title, type = _a.type, category = _a.category, stars = _a.stars, year = _a.year;
                        query = void 0;
                        // add title to query
                        if (title) {
                            query = __assign({ title: { $regex: title, $options: 'i' } }, query);
                        }
                        // add type to query
                        if (type) {
                            query = __assign(__assign({}, query), { type: type });
                        }
                        // add category to query
                        if (category) {
                            query = __assign(__assign({}, query), { categories: (0, convertToObjectId_1.convertToObjectId)(category) });
                        }
                        // add stars to query
                        if (stars) {
                            query = __assign(__assign({}, query), { stars: { $gte: Number(stars) } });
                        }
                        // add year to query
                        if (year && year.split(',').length === 2) {
                            _b = year.split(','), fromYear = _b[0], toYear = _b[1];
                            query = __assign(__assign({}, query), { $and: [
                                    { releaseDate: { $gte: new Date(Number(fromYear.trim()), 0, 1) } },
                                    { releaseDate: { $lte: new Date(Number(toYear.trim()), 11, 31) } },
                                ] });
                        }
                        return [4 /*yield*/, this.videoService.searchVideo(query)];
                    case 1:
                        searchResults = _c.sent();
                        res.status(200).json(searchResults);
                        return [3 /*break*/, 3];
                    case 2:
                        error_8 = _c.sent();
                        next(error_8);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.videoService = _videoService;
        this.seasonService = _seasonService;
        this.episodeService = _episodeService;
    }
    return VideoController;
}());
exports.VideoController = VideoController;
