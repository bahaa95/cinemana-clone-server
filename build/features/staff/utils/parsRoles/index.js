"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRoles = void 0;
function parseRoles(roles) {
    var parsedRoles = (typeof roles === 'string' ? JSON.parse(roles) : roles);
    return parsedRoles;
}
exports.parseRoles = parseRoles;
