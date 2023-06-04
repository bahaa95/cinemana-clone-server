"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var has_1 = __importDefault(require("./has"));
var remove_1 = __importDefault(require("./remove"));
var replace_1 = __importDefault(require("./replace"));
exports.default = { remove: remove_1.default, replace: replace_1.default, has: has_1.default };
