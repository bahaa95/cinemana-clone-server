"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonParseVideo = void 0;
var jsonParse_1 = require("@/utils/jsonParse");
function jsonParseVideo(video) {
    var isPublic = video.isPublic, stars = video.stars, releaseDate = video.releaseDate, uploadDate = video.uploadDate, isSpecial = video.isSpecial, specialExpire = video.specialExpire, categories = video.categories, actors = video.actors, directors = video.directors, writers = video.writers, description = video.description, mainCategory = video.mainCategory, title = video.title, triler = video.triler, type = video.type, videoUrl = video.video, props = __rest(video, ["isPublic", "stars", "releaseDate", "uploadDate", "isSpecial", "specialExpire", "categories", "actors", "directors", "writers", "description", "mainCategory", "title", "triler", "type", "video"]);
    return {
        isPublic: (0, jsonParse_1.jsonParse)(isPublic),
        stars: Number(stars),
        releaseDate: new Date(releaseDate),
        uploadDate: new Date(uploadDate),
        isSpecial: (0, jsonParse_1.jsonParse)(isSpecial),
        specialExpire: new Date(specialExpire),
        categories: (0, jsonParse_1.jsonParse)(categories),
        actors: (0, jsonParse_1.jsonParse)(actors),
        directors: (0, jsonParse_1.jsonParse)(directors),
        writers: (0, jsonParse_1.jsonParse)(writers),
        description: description,
        mainCategory: mainCategory,
        title: title,
        triler: triler,
        type: type,
        video: videoUrl,
    };
}
exports.jsonParseVideo = jsonParseVideo;
