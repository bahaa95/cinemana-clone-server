"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSeasons = void 0;
var videos_1 = require("@/features/videos");
var episodes_1 = require("@/features/episodes");
var model_1 = require("./model");
var service_1 = require("./service");
var controller_1 = require("./controller");
var router_1 = require("./router");
function setupSeasons() {
    var router = new router_1.SeasonRouter(new controller_1.SeasonController(new service_1.SeasonService(model_1.Season), new videos_1.VideoService(videos_1.Video), new episodes_1.EpisodeService(episodes_1.Episode)));
    return router.getRoutes();
}
exports.setupSeasons = setupSeasons;
