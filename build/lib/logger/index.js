"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var winston_1 = require("winston");
var timestamp = winston_1.format.timestamp, combine = winston_1.format.combine, printf = winston_1.format.printf, errors = winston_1.format.errors, json = winston_1.format.json, prettyPrint = winston_1.format.prettyPrint;
var isDevelopment_1 = require("@/utils/isDevelopment");
var winston_transport_sentry_node_1 = __importDefault(require("winston-transport-sentry-node"));
var index_1 = require("@/config/index");
var WinstonLogger = /** @class */ (function () {
    function WinstonLogger() {
        if ((0, isDevelopment_1.isDevelopment)()) {
            this.logger = this.developmentLogger();
        }
        else {
            this.logger = this.productionLogger();
        }
    }
    WinstonLogger.prototype.developmentLogger = function () {
        return (0, winston_1.createLogger)({
            level: 'silly',
            format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), this.format(), prettyPrint()),
            transports: [new winston_1.transports.Console()],
            exitOnError: false,
        });
    };
    WinstonLogger.prototype.productionLogger = function () {
        return (0, winston_1.createLogger)({
            level: 'info',
            format: combine(timestamp(), errors({ stack: true }), json()),
            defaultMeta: { service: 'cinemana-clone server' },
            transports: [
                new winston_transport_sentry_node_1.default({
                    sentry: {
                        dsn: index_1.SENTRY_DSN,
                    },
                    level: 'info',
                }),
            ],
            exitOnError: false,
        });
    };
    WinstonLogger.prototype.format = function () {
        return printf(
        /* tslint:disable-next-line */
        function (_a) {
            var level = _a.level, message = _a.message, timestamp = _a.timestamp, stack = _a.stack;
            return "".concat(timestamp, " ").concat(level, ": ").concat(message, " ").concat(stack || '');
        });
    };
    return WinstonLogger;
}());
exports.logger = new WinstonLogger().logger;
