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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.limiter = void 0;
var express_rate_limit_1 = __importStar(require("express-rate-limit"));
var httperror_1 = require("@/lib/httperror");
function limiter(options) {
    if (options === void 0) { options = {}; }
    return (0, express_rate_limit_1.default)(__assign(__assign({ windowMs: options.windowMs || 1000 * 60 * 15, max: options.max || 50, standardHeaders: true, legacyHeaders: true, keyGenerator: function (req, res) { var _a; return (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.id; }, 
        /* tslint:disable-next-line */
        handler: function (request, response, next, options) {
            return response.status(options.statusCode).json({
                status: httperror_1.statuses.Too_Many_Requests,
                name: 'TooManyRequests',
                message: options.message || "Too many requests, please try again later.",
            });
        } }, options), { store: new express_rate_limit_1.MemoryStore() }));
}
exports.limiter = limiter;
