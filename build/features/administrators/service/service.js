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
exports.AdministratorService = void 0;
// ! don't return the value for private method to clients and admins it's for internal usage only.
// ! only return the value for public methods.
var AdministratorService = /** @class */ (function () {
    function AdministratorService(_Administrator) {
        var _this = this;
        /**
         * @access private
         */
        this.addAdministrator = function (administrator) { return __awaiter(_this, void 0, void 0, function () {
            var newAdministrator;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new this.Administrator(administrator).save()];
                    case 1:
                        newAdministrator = _a.sent();
                        return [2 /*return*/, newAdministrator];
                }
            });
        }); };
        /**
         * @access private
         */
        this.editAccount = function (_id, administrator) { return __awaiter(_this, void 0, void 0, function () {
            var editedAccount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.Administrator.findOneAndUpdate({ _id: _id }, { $set: administrator }, { new: true })];
                    case 1:
                        editedAccount = _a.sent();
                        return [2 /*return*/, editedAccount];
                }
            });
        }); };
        /**
         * @access public dashboard
         */
        this.editRoles = function (_id, roles) { return __awaiter(_this, void 0, void 0, function () {
            var editedAdministrator;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.Administrator.findOneAndUpdate({
                            _id: _id,
                        }, {
                            $set: {
                                roles: roles,
                            },
                        }, { new: true, select: { password: 0 } })];
                    case 1:
                        editedAdministrator = _a.sent();
                        return [2 /*return*/, editedAdministrator];
                }
            });
        }); };
        /**
         * @access public dashboard
         */
        this.toggleActivated = function (_id) { return __awaiter(_this, void 0, void 0, function () {
            var account, editedAccount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAccount({ _id: _id })];
                    case 1:
                        account = _a.sent();
                        // return null if the account not found
                        if (!account) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.Administrator.findOneAndUpdate({
                                _id: account._id,
                            }, {
                                $set: {
                                    activated: !account.activated,
                                },
                            }, { new: true, select: { password: 0 } })];
                    case 2:
                        editedAccount = _a.sent();
                        return [2 /*return*/, editedAccount];
                }
            });
        }); };
        /**
         * @access public dashboard
         */
        this.getAccounts = function () { return __awaiter(_this, void 0, void 0, function () {
            var accounts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.Administrator.aggregate([
                            { $match: {} },
                            { $project: { password: 0 } },
                        ])];
                    case 1:
                        accounts = _a.sent();
                        return [2 /*return*/, accounts];
                }
            });
        }); };
        /**
         * @access private
         */
        this.getAccount = function (query) { return __awaiter(_this, void 0, void 0, function () {
            var adminstartor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.Administrator.aggregate([
                            { $match: __assign({}, query) },
                        ])];
                    case 1:
                        adminstartor = (_a.sent())[0];
                        if (!adminstartor)
                            return [2 /*return*/, null];
                        return [2 /*return*/, adminstartor];
                }
            });
        }); };
        /**
         * @access private
         */
        this.isEmailExist = function (email, _id) { return __awaiter(_this, void 0, void 0, function () {
            var filterQuery, account, isExist;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filterQuery = {
                            email: email,
                        };
                        if (_id) {
                            filterQuery._id = { $ne: { _id: _id } };
                        }
                        return [4 /*yield*/, this.Administrator.findOne(filterQuery)];
                    case 1:
                        account = _a.sent();
                        isExist = account ? true : false;
                        return [2 /*return*/, isExist];
                }
            });
        }); };
        this.Administrator = _Administrator;
    }
    return AdministratorService;
}());
exports.AdministratorService = AdministratorService;
