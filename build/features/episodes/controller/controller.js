"use strict";
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
exports.EpisodeController = void 0;
var mediaService_1 = require("@/lib/mediaService");
var parseEpisode_1 = require("../utils/parseEpisode");
var convertToObjectId_1 = require("@/utils/convertToObjectId");
var httperror_1 = require("@/lib/httperror");
var EpisodeController = /** @class */ (function () {
    function EpisodeController(_episodesService) {
        var _this = this;
        this.addEpisode = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var data, episode, image, editedEpisode, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        data = (0, parseEpisode_1.parseEpisode)(req.body);
                        return [4 /*yield*/, this.episodesService.addEpisode(data)];
                    case 1:
                        episode = _a.sent();
                        return [4 /*yield*/, mediaService_1.mediaService.upload(req.file)];
                    case 2:
                        image = _a.sent();
                        return [4 /*yield*/, this.episodesService.editEpisode(episode._id, {
                                image: image,
                            })];
                    case 3:
                        editedEpisode = _a.sent();
                        res.status(201).json(editedEpisode);
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.editEpisode = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _id, duration, video, episode, editedEpisode, newImage, editedEpisode2, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        _id = (0, convertToObjectId_1.convertToObjectId)(req.params._id);
                        duration = Number(req.body.duration);
                        video = req.body.video;
                        return [4 /*yield*/, this.episodesService.getEpisodeById(_id)];
                    case 1:
                        episode = _a.sent();
                        // throw HttpError if episode not found
                        if (!episode) {
                            throw new httperror_1.HttpError({
                                status: httperror_1.statuses.Not_Found,
                                message: "Episode with id ".concat(_id, " not found"),
                                feature: 'episodes',
                            });
                        }
                        return [4 /*yield*/, this.episodesService.editEpisode(_id, {
                                duration: duration,
                                video: video,
                            })];
                    case 2:
                        editedEpisode = (_a.sent());
                        // return the response if there is no image file in request
                        if (!req.file) {
                            res.status(200).json(editedEpisode);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, mediaService_1.mediaService.update(episode.image.publicId, req.file)];
                    case 3:
                        newImage = _a.sent();
                        return [4 /*yield*/, this.episodesService.editEpisode(_id, {
                                image: newImage,
                            })];
                    case 4:
                        editedEpisode2 = (_a.sent());
                        res.status(200).json(editedEpisode2);
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.deleteEpisode = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _id, deletedEpisode, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        _id = (0, convertToObjectId_1.convertToObjectId)(req.params._id);
                        return [4 /*yield*/, this.episodesService.deleteEpisode(_id)];
                    case 1:
                        deletedEpisode = _a.sent();
                        // throw HttpError if episode not found
                        if (!deletedEpisode) {
                            throw new httperror_1.HttpError({
                                status: httperror_1.statuses.Not_Found,
                                message: "Episode with id ".concat(_id, " not found"),
                                feature: 'episodes',
                            });
                        }
                        // delete episode image from mediaService
                        return [4 /*yield*/, mediaService_1.mediaService.delete(deletedEpisode.image.publicId)];
                    case 2:
                        // delete episode image from mediaService
                        _a.sent();
                        res.status(200).json(deletedEpisode);
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.episodesService = _episodesService;
    }
    return EpisodeController;
}());
exports.EpisodeController = EpisodeController;
