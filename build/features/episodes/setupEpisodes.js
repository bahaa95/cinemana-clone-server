"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupEpisodes = void 0;
var router_1 = require("./router");
var controller_1 = require("./controller");
var service_1 = require("./service");
var model_1 = require("./model");
function setupEpisodes() {
    var router = new router_1.EpisodeRouter(new controller_1.EpisodeController(new service_1.EpisodeService(model_1.Episode)));
    return router.getRoutes();
}
exports.setupEpisodes = setupEpisodes;
