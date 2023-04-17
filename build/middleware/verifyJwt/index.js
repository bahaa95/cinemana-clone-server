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
exports.verifyJwt = void 0;
var jwt_1 = require("@/lib/jwt");
var httperror_1 = require("@/lib/httperror");
var index_1 = require("@/config/index");
function verifyJwt(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var authorization, _c, accessToken, payload, _d, error_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 5, , 6]);
                    authorization = (((_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) ||
                        ((_b = req.headers) === null || _b === void 0 ? void 0 : _b.Authorization));
                    if (!authorization ||
                        (!authorization.startsWith('Bearar ') &&
                            !authorization.startsWith('bearar '))) {
                        throw new httperror_1.HttpError({
                            status: httperror_1.statuses.Unauthorized,
                        });
                    }
                    _c = authorization.split(' '), accessToken = _c[1];
                    payload = void 0;
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, jwt_1.jwt.verify(accessToken, index_1.ACCESS_TOKEN_PUBLIC_KEY)];
                case 2:
                    payload = _e.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _d = _e.sent();
                    throw new httperror_1.HttpError({ status: httperror_1.statuses.Unauthorized });
                case 4:
                    // add user data to request
                    req.User = payload.User;
                    next();
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _e.sent();
                    next(error_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.verifyJwt = verifyJwt;
