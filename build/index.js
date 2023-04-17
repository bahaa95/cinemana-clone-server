"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("module-alias/register");
var app_1 = require("./app");
var staffRoles_1 = require("@/features/staffRoles");
var staff_1 = require("@/features/staff");
var categories_1 = require("@/features/categories");
var administrators_1 = require("@/features/administrators");
var videos_1 = require("@/features/videos");
var seasons_1 = require("@/features/seasons");
var episodes_1 = require("@/features/episodes");
var groups_1 = require("@/features/groups");
var users_1 = require("@/features/users");
var history_1 = require("@/features/history");
var app = new app_1.App(3030, [
    (0, staffRoles_1.setupStaffRoles)(),
    (0, staff_1.setupStaff)(),
    (0, categories_1.setupCategories)(),
    (0, administrators_1.setupAdministrators)(),
    (0, videos_1.setupVideos)(),
    (0, seasons_1.setupSeasons)(),
    (0, episodes_1.setupEpisodes)(),
    (0, groups_1.setupGroups)(),
    (0, users_1.setupUsers)(),
    (0, history_1.setupHistory)(),
]);
app.listen();
