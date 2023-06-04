"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseGroup = void 0;
var jsonParse_1 = require("@/utils/jsonParse");
function parseGroup(group) {
    var title = group.title, videos = group.videos;
    return {
        title: title,
        videos: (0, jsonParse_1.jsonParse)(videos),
    };
}
exports.parseGroup = parseGroup;
