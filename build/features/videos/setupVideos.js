"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupVideos = void 0;
var seasons_1 = require("@/features/seasons");
var episodes_1 = require("@/features/episodes");
var router_1 = require("./router");
var controller_1 = require("./controller");
var service_1 = require("./service");
var model_1 = require("./model");
function setupVideos() {
    var router = new router_1.VideoRouter(new controller_1.VideoController(new service_1.VideoService(model_1.Video), new seasons_1.SeasonService(seasons_1.Season), new episodes_1.EpisodeService(episodes_1.Episode)));
    return router.getRoutes();
}
exports.setupVideos = setupVideos;
