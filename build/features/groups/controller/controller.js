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
exports.GroupController = void 0;
var parseGroup_1 = require("../utils/parseGroup");
var convertToObjectId_1 = require("@/utils/convertToObjectId");
var httperror_1 = require("@/lib/httperror");
var GroupController = /** @class */ (function () {
    function GroupController(_groupService) {
        var _this = this;
        this.addGroup = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var data, newGroup, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        data = (0, parseGroup_1.parseGroup)(req.body);
                        return [4 /*yield*/, this.groupService.addGroup(data)];
                    case 1:
                        newGroup = _a.sent();
                        res.status(201).json(newGroup);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.editGroup = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _id, data, editedGroup, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        _id = (0, convertToObjectId_1.convertToObjectId)(req.params._id);
                        data = (0, parseGroup_1.parseGroup)(req.body);
                        return [4 /*yield*/, this.groupService.editGroup(_id, data)];
                    case 1:
                        editedGroup = _a.sent();
                        // throw HttpError if group not found
                        if (!editedGroup) {
                            throw new httperror_1.HttpError({
                                status: httperror_1.statuses.Not_Found,
                                message: "Group with _id ".concat(_id, " not found."),
                                feature: 'groups',
                            });
                        }
                        res.status(200).json(editedGroup);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteGroup = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _id, deleteGroup, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        _id = (0, convertToObjectId_1.convertToObjectId)(req.params._id);
                        return [4 /*yield*/, this.groupService.deleteGroup(_id)];
                    case 1:
                        deleteGroup = _a.sent();
                        // throw HttpError if group not found
                        if (!deleteGroup) {
                            throw new httperror_1.HttpError({
                                status: httperror_1.statuses.Not_Found,
                                message: "Group with _id ".concat(_id, " not found."),
                                feature: 'groups',
                            });
                        }
                        res.status(200).json(deleteGroup);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getGroups = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var groups, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.groupService.getGroups()];
                    case 1:
                        groups = _a.sent();
                        res.status(200).json(groups);
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getGroupWithVideos = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _id, group, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        _id = (0, convertToObjectId_1.convertToObjectId)(req.params._id);
                        return [4 /*yield*/, this.groupService.getGroupWithVideos(_id)];
                    case 1:
                        group = _a.sent();
                        // throw HttpError if group not found
                        if (!group) {
                            throw new httperror_1.HttpError({
                                status: httperror_1.statuses.Not_Found,
                                message: "Group with _id ".concat(_id, " not found."),
                                feature: 'groups',
                            });
                        }
                        res.status(200).json(group);
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        next(error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getGroupsWithVideos = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var groups, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.groupService.getGroupsWithVideos()];
                    case 1:
                        groups = _a.sent();
                        res.status(200).json(groups);
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        next(error_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.groupService = _groupService;
    }
    return GroupController;
}());
exports.GroupController = GroupController;
