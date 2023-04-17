"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniqueVideos = void 0;
function uniqueVideos(videos) {
    return videos.filter(function (obj, index) {
        return videos.findIndex(function (item) { return item.title === obj.title; }) === index;
    });
}
exports.uniqueVideos = uniqueVideos;
