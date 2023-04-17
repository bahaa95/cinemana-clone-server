"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCookieId = void 0;
var uuid_1 = require("uuid");
var isProduction_1 = require("@/utils/isProduction");
var generateCookieId = function (req, res, next) {
    var cookies = req.cookies;
    // generate cookie id
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.id)) {
        res.cookie('id', (0, uuid_1.v4)(), {
            httpOnly: true,
            sameSite: (0, isProduction_1.isProduction)() ? 'none' : 'lax',
            secure: (0, isProduction_1.isProduction)(),
            maxAge: 1000 * 60 * 60 * 24 * 30,
        });
    }
    next();
};
exports.generateCookieId = generateCookieId;
