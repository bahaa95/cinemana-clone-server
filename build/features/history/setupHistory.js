"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupHistory = void 0;
var router_1 = require("./router");
var controller_1 = require("./controller");
var service_1 = require("./service");
var model_1 = require("./model");
function setupHistory() {
    var router = new router_1.HistoryRouter(new controller_1.HistoryController(new service_1.HistoryService(model_1.History)));
    return router.getRoutes();
}
exports.setupHistory = setupHistory;
