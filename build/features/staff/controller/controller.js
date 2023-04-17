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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
exports.StaffController = void 0;
var mediaService_1 = require("@/lib/mediaService");
var httperror_1 = require("@/lib/httperror");
var convertToObjectId_1 = require("@/utils/convertToObjectId");
var parsRoles_1 = require("../utils/parsRoles");
var uniqueVideos_1 = require("../utils/uniqueVideos");
var StaffController = /** @class */ (function () {
    function StaffController(_staffService) {
        var _this = this;
        this.addPerson = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, name_1, roles, newPerson, image, person, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        _a = req.body, name_1 = _a.name, roles = _a.roles;
                        return [4 /*yield*/, this.staffService.addPerson({
                                name: name_1,
                                roles: (0, parsRoles_1.parseRoles)(roles),
                            })];
                    case 1:
                        newPerson = _b.sent();
                        return [4 /*yield*/, mediaService_1.mediaService.upload(req.file)];
                    case 2:
                        image = _b.sent();
                        return [4 /*yield*/, this.staffService.editPerson(newPerson._id, {
                                image: image,
                            })];
                    case 3:
                        person = _b.sent();
                        res.status(201).json(person);
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _b.sent();
                        next(error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.editPerson = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _id, _a, name_2, roles, editedPerson, image, person, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        _id = (0, convertToObjectId_1.convertToObjectId)(req.params._id);
                        _a = req.body, name_2 = _a.name, roles = _a.roles;
                        return [4 /*yield*/, this.staffService.editPerson(_id, {
                                name: name_2,
                                roles: (0, parsRoles_1.parseRoles)(roles),
                            })];
                    case 1:
                        editedPerson = _b.sent();
                        // throw HttpError if person is not found
                        if (!editedPerson) {
                            throw new httperror_1.HttpError({
                                status: httperror_1.statuses.Not_Found,
                                message: 'Person not found.',
                            });
                        }
                        // return response if there is no file in req (person image will not update)
                        if (!req.file) {
                            res.status(200).json(editedPerson);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, mediaService_1.mediaService.update(editedPerson.image.publicId, req.file)];
                    case 2:
                        image = _b.sent();
                        return [4 /*yield*/, this.staffService.editPerson(editedPerson._id, {
                                image: image,
                            })];
                    case 3:
                        person = _b.sent();
                        res.status(200).json(person);
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _b.sent();
                        next(error_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.deletePerson = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _id, deletePerson, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        _id = (0, convertToObjectId_1.convertToObjectId)(req.params._id);
                        return [4 /*yield*/, this.staffService.deletePerson(_id)];
                    case 1:
                        deletePerson = _a.sent();
                        // throw HttpError if person is not found
                        if (!deletePerson) {
                            throw new httperror_1.HttpError({
                                status: httperror_1.statuses.Not_Found,
                                message: 'Person not found.',
                            });
                        }
                        // delete person image from mediaService
                        return [4 /*yield*/, mediaService_1.mediaService.delete(deletePerson === null || deletePerson === void 0 ? void 0 : deletePerson.image.publicId)];
                    case 2:
                        // delete person image from mediaService
                        _a.sent();
                        res.status(200).json(deletePerson);
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getStaff = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var staff, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.staffService.getStaff()];
                    case 1:
                        staff = _a.sent();
                        res.status(200).json(staff);
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getStaffByRole = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var roleId, staff, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        roleId = (0, convertToObjectId_1.convertToObjectId)(req.params.roleId);
                        return [4 /*yield*/, this.staffService.getStaffByRole(roleId)];
                    case 1:
                        staff = _a.sent();
                        res.status(200).json(staff);
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        next(error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getPersonAndVideos = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _id, person, actorVideos, dierctorVideos, writerVideos, personInfo, videos, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        _id = (0, convertToObjectId_1.convertToObjectId)(req.params._id);
                        return [4 /*yield*/, this.staffService.getPersonWithVideos(_id)];
                    case 1:
                        person = _a.sent();
                        // throw HttpError if person is not found
                        if (!person) {
                            throw new httperror_1.HttpError({
                                status: httperror_1.statuses.Not_Found,
                                message: 'Person not found.',
                                feature: 'staff',
                            });
                        }
                        actorVideos = person.actorVideos, dierctorVideos = person.dierctorVideos, writerVideos = person.writerVideos, personInfo = __rest(person, ["actorVideos", "dierctorVideos", "writerVideos"]);
                        videos = (0, uniqueVideos_1.uniqueVideos)(__spreadArray(__spreadArray(__spreadArray([], actorVideos, true), dierctorVideos, true), writerVideos, true));
                        res.status(200).json(__assign(__assign({}, personInfo), { videos: videos }));
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        next(error_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getPerson = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _id, name_3, query, person, error_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.query, _id = _a._id, name_3 = _a.name;
                        query = {};
                        if (_id)
                            query._id = _id;
                        if (name_3)
                            query.name = name_3;
                        return [4 /*yield*/, this.staffService.getPerson(query)];
                    case 1:
                        person = _b.sent();
                        // throw HttpError if person not found
                        if (!person) {
                            throw new httperror_1.HttpError({ status: httperror_1.statuses.Not_Found });
                        }
                        res.status(200).json(person);
                        return [3 /*break*/, 3];
                    case 2:
                        error_7 = _b.sent();
                        next(error_7);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.staffService = _staffService;
    }
    return StaffController;
}());
exports.StaffController = StaffController;
