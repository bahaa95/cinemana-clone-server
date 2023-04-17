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
exports.AdminstratorController = void 0;
var httperror_1 = require("@/lib/httperror");
var bcrypt_1 = require("@/lib/bcrypt");
var jwt_1 = require("@/lib/jwt");
var config_1 = require("@/config");
var isProduction_1 = require("@/utils/isProduction");
var parsRoles_1 = require("../utils/parsRoles");
var convertToObjectId_1 = require("@/utils/convertToObjectId");
var cookieOptions = {
    httpOnly: true,
    sameSite: (0, isProduction_1.isProduction)() ? 'none' : 'lax',
    secure: (0, isProduction_1.isProduction)(),
    maxAge: 1000 * 60 * 60 * 24,
};
var AdminstratorController = /** @class */ (function () {
    function AdminstratorController(_adminstratorService) {
        var _this = this;
        this.signup = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, email, password, hash, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, email = _a.email, password = _a.password;
                        return [4 /*yield*/, bcrypt_1.bcrypt.hash(password)];
                    case 1:
                        hash = _b.sent();
                        // add adminstrator to database
                        return [4 /*yield*/, this.adminstratorService.addAdministrator({
                                email: email,
                                password: hash,
                            })];
                    case 2:
                        // add adminstrator to database
                        _b.sent();
                        res.status(201).json({
                            message: 'Signup successfully.',
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        next(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.signin = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var account, accessTokenPayload, accessToken, refreshTokenPayload, refreshToken, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        account = req.Payload.account;
                        accessTokenPayload = {
                            User: {
                                _id: account._id,
                                email: account.email,
                                roles: account.roles,
                            },
                        };
                        return [4 /*yield*/, jwt_1.jwt.sign(accessTokenPayload, config_1.ACCESS_TOKEN_PRIVATE_KEY, {
                                algorithm: 'RS512',
                                expiresIn: '15m',
                            })];
                    case 1:
                        accessToken = _a.sent();
                        refreshTokenPayload = {
                            User: {
                                _id: account._id,
                            },
                        };
                        return [4 /*yield*/, jwt_1.jwt.sign(refreshTokenPayload, config_1.REFRESH_TOKEN_PRIVATE_KEY, {
                                algorithm: 'RS512',
                                expiresIn: '1d',
                            })];
                    case 2:
                        refreshToken = _a.sent();
                        // generate cookie for refresh token
                        res.cookie('refreshToken', refreshToken, __assign({}, cookieOptions));
                        res.status(202).json({ accessToken: accessToken });
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.editAccount = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _id, data, hash, editedAccount, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        _id = (0, convertToObjectId_1.convertToObjectId)(req.params._id);
                        data = req.body;
                        return [4 /*yield*/, bcrypt_1.bcrypt.hash(data.password)];
                    case 1:
                        hash = _a.sent();
                        return [4 /*yield*/, this.adminstratorService.editAccount(_id, __assign(__assign({}, data), { password: hash }))];
                    case 2:
                        editedAccount = _a.sent();
                        // throw HttpError if account not found
                        if (!editedAccount) {
                            throw new httperror_1.HttpError({
                                status: httperror_1.statuses.Not_Found,
                                message: 'Account not found.',
                                feature: 'adminstrators',
                            });
                        }
                        res.status(200).json({ message: 'Account edited successfully.' });
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.editRoles = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _id, roles, editedAccount, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        _id = (0, convertToObjectId_1.convertToObjectId)(req.params._id);
                        roles = (0, parsRoles_1.parseRoles)(req.body.roles);
                        return [4 /*yield*/, this.adminstratorService.editRoles(_id, roles)];
                    case 1:
                        editedAccount = _a.sent();
                        // throw HttpError if account is not found
                        if (!editedAccount) {
                            throw new httperror_1.HttpError({
                                status: httperror_1.statuses.Not_Found,
                                message: 'Account not found.',
                                feature: 'adminstrators',
                            });
                        }
                        res.status(200).json(editedAccount);
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.toggleActivated = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _id, editedAccount, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        _id = (0, convertToObjectId_1.convertToObjectId)(req.params._id);
                        return [4 /*yield*/, this.adminstratorService.toggleActivated(_id)];
                    case 1:
                        editedAccount = _a.sent();
                        // throw HttpError if account is not found
                        if (!editedAccount) {
                            throw new httperror_1.HttpError({
                                status: httperror_1.statuses.Not_Found,
                                message: 'Account not found.',
                                feature: 'adminstrators',
                            });
                        }
                        res.status(200).json(editedAccount);
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        next(error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getAccounts = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var accounts, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.adminstratorService.getAccounts()];
                    case 1:
                        accounts = _a.sent();
                        res.status(200).json(accounts);
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        next(error_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.refreshToken = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var cookies, payload, _a, _id, adminstrator, accessTokenPayload, accessToken, error_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        cookies = req.cookies;
                        // throw HttpError if refreshToken cookie does not exist
                        if (!(cookies === null || cookies === void 0 ? void 0 : cookies.refreshToken)) {
                            throw new httperror_1.HttpError({ status: httperror_1.statuses.Unauthorized });
                        }
                        payload = void 0;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, jwt_1.jwt.verify(cookies.refreshToken, config_1.REFRESH_TOKEN_PUBLIC_KEY)];
                    case 2:
                        payload = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _b.sent();
                        res.clearCookie('refreshToken', cookieOptions);
                        throw new httperror_1.HttpError({ status: httperror_1.statuses.Unauthorized });
                    case 4:
                        _id = (0, convertToObjectId_1.convertToObjectId)(payload.User._id);
                        return [4 /*yield*/, this.adminstratorService.getAccount({ _id: _id })];
                    case 5:
                        adminstrator = _b.sent();
                        // throw HttpError if adminstrator account not found
                        if (!adminstrator) {
                            res.clearCookie('refreshToken', cookieOptions);
                            throw new httperror_1.HttpError({ status: httperror_1.statuses.Unauthorized });
                        }
                        accessTokenPayload = {
                            User: {
                                _id: adminstrator._id,
                                email: adminstrator.email,
                                roles: adminstrator.roles,
                            },
                        };
                        return [4 /*yield*/, jwt_1.jwt.sign(accessTokenPayload, config_1.ACCESS_TOKEN_PRIVATE_KEY, {
                                algorithm: 'RS512',
                                expiresIn: '15m',
                            })];
                    case 6:
                        accessToken = _b.sent();
                        res.status(200).json({ accessToken: accessToken });
                        return [3 /*break*/, 8];
                    case 7:
                        error_7 = _b.sent();
                        next(error_7);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.emailMustNotExistBefore = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _id, email, isExist, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        _id = (0, convertToObjectId_1.convertToObjectId)(req.params._id);
                        email = req.body.email;
                        return [4 /*yield*/, this.adminstratorService.isEmailExist(email, _id)];
                    case 1:
                        isExist = _a.sent();
                        // throw HttpError if email already exists
                        if (isExist) {
                            throw new httperror_1.HttpError({
                                status: httperror_1.statuses.Conflict,
                                message: 'Email already exists.',
                                feature: 'adminstrators',
                            });
                        }
                        next();
                        return [3 /*break*/, 3];
                    case 2:
                        error_8 = _a.sent();
                        next(error_8);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.isEmailExist = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var email, account, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        email = req.body.email;
                        return [4 /*yield*/, this.adminstratorService.getAccount({ email: email })];
                    case 1:
                        account = _a.sent();
                        // throw HttpError if account not found
                        if (!account) {
                            throw new httperror_1.HttpError({
                                status: httperror_1.statuses.Bad_Request,
                                message: 'Invalid email.',
                                feature: 'adminstrators',
                            });
                        }
                        req.Payload = {
                            account: account,
                        };
                        next();
                        return [3 /*break*/, 3];
                    case 2:
                        error_9 = _a.sent();
                        next(error_9);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.comparePassword = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var password, account, passwordMatch, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        password = req.body.password;
                        account = req.Payload.account;
                        return [4 /*yield*/, bcrypt_1.bcrypt.compare(password, account.password)];
                    case 1:
                        passwordMatch = _a.sent();
                        // throw HttpError if password not match
                        if (!passwordMatch) {
                            throw new httperror_1.HttpError({
                                status: httperror_1.statuses.Bad_Request,
                                message: 'Invalid password.',
                                feature: 'adminstrators',
                            });
                        }
                        next();
                        return [3 /*break*/, 3];
                    case 2:
                        error_10 = _a.sent();
                        next(error_10);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.isAccountActivated = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var account;
            return __generator(this, function (_a) {
                try {
                    account = req.Payload.account;
                    // throw HttpError if account not activated
                    if (!account.activated) {
                        throw new httperror_1.HttpError({
                            status: httperror_1.statuses.Forbidden,
                            message: 'Account not activated yet.',
                            feature: 'adminstrators',
                        });
                    }
                    next();
                }
                catch (error) {
                    next(error);
                }
                return [2 /*return*/];
            });
        }); };
        this.adminstratorService = _adminstratorService;
    }
    return AdminstratorController;
}());
exports.AdminstratorController = AdminstratorController;
