"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUser = void 0;
function parseUser(user) {
    var email = user.email, password = user.password, username = user.username;
    return { email: email, password: password, username: username };
}
exports.parseUser = parseUser;
