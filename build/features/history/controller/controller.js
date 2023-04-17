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
exports.HistoryController = void 0;
var parseHistory_1 = require("../utils/parseHistory");
var createId_1 = require("../utils/createId");
var convertToObjectId_1 = require("@/utils/convertToObjectId");
var httperror_1 = require("@/lib/httperror");
var HistoryController = /** @class */ (function () {
    function HistoryController(_historyService) {
        var _this = this;
        this.getHistory = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var userId, videoId, id, history_1, error_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        userId = (0, convertToObjectId_1.convertToObjectId)(req.User._id);
                        videoId = (0, convertToObjectId_1.convertToObjectId)((_a = req.params) === null || _a === void 0 ? void 0 : _a.videoId);
                        id = (0, createId_1.createId)(userId, videoId);
                        return [4 /*yield*/, this.historyService.getHistory(id)];
                    case 1:
                        history_1 = _b.sent();
                        if (!history_1) {
                            throw new httperror_1.HttpError({
                                status: httperror_1.statuses.Not_Found,
                                message: 'There is no history available',
                            });
                        }
                        res.status(200).json(history_1);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        next(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.editHistory = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var userId, videoId, id, data, history_2, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = (0, convertToObjectId_1.convertToObjectId)(req.User._id);
                        videoId = (0, convertToObjectId_1.convertToObjectId)(req.query.videoId);
                        id = (0, createId_1.createId)(userId, videoId);
                        data = (0, parseHistory_1.parseHistory)(req.body);
                        return [4 /*yield*/, this.historyService.editHistory(id, __assign({ id: id, userId: userId, videoId: videoId }, data))];
                    case 1:
                        history_2 = _a.sent();
                        res.status(200).json(history_2);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getFavoriteVideos = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var userId, favoriteVideos, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = (0, convertToObjectId_1.convertToObjectId)(req.User._id);
                        return [4 /*yield*/, this.historyService.getFavoriteVideos(userId)];
                    case 1:
                        favoriteVideos = _a.sent();
                        res.status(200).json(favoriteVideos);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getWatchList = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var userId, watchList, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = (0, convertToObjectId_1.convertToObjectId)(req.User._id);
                        return [4 /*yield*/, this.historyService.getWatchList(userId)];
                    case 1:
                        watchList = _a.sent();
                        res.status(200).json(watchList);
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.historyService = _historyService;
    }
    return HistoryController;
}());
exports.HistoryController = HistoryController;
