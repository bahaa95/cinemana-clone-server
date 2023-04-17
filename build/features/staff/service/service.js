"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffService = void 0;
var query_1 = require("./query");
// ! don't return the value for private methods to clients or admins it's for internal usage only.
// ! only return the value for public methods.
var StaffService = /** @class */ (function () {
    function StaffService(_Staff) {
        var _this = this;
        /**
         * @access public dashboard
         */
        this.addPerson = function (person) { return __awaiter(_this, void 0, void 0, function () {
            var _id, newPerson;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new this.Staff(person).save()];
                    case 1:
                        _id = (_a.sent())._id;
                        return [4 /*yield*/, this.getPerson({ _id: _id })];
                    case 2:
                        newPerson = _a.sent();
                        return [2 /*return*/, newPerson];
                }
            });
        }); };
        /**
         * @access public dashboard
         */
        this.editPerson = function (_id, person) { return __awaiter(_this, void 0, void 0, function () {
            var editedPerson, personDoc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.Staff.findOneAndUpdate({ _id: _id }, { $set: person })];
                    case 1:
                        editedPerson = _a.sent();
                        if (!editedPerson) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.getPerson({ _id: editedPerson._id })];
                    case 2:
                        personDoc = _a.sent();
                        return [2 /*return*/, personDoc];
                }
            });
        }); };
        /**
         * @access public dashboard
         */
        this.deletePerson = function (_id) { return __awaiter(_this, void 0, void 0, function () {
            var personDoc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPerson({ _id: _id })];
                    case 1:
                        personDoc = _a.sent();
                        // return null if the person is not found
                        if (!personDoc) {
                            return [2 /*return*/, null];
                        }
                        // delete the person
                        return [4 /*yield*/, this.Staff.findOneAndDelete({ _id: _id })];
                    case 2:
                        // delete the person
                        _a.sent();
                        return [2 /*return*/, personDoc];
                }
            });
        }); };
        /**
         * @access public dashboard
         */
        this.getStaff = function () { return __awaiter(_this, void 0, void 0, function () {
            var staff;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.Staff.aggregate([
                            { $match: {} },
                            {
                                $lookup: query_1.lookupToRoles,
                            },
                        ])];
                    case 1:
                        staff = _a.sent();
                        return [2 /*return*/, staff];
                }
            });
        }); };
        /**
         * @access public dashboard
         */
        this.getStaffByRole = function (role) { return __awaiter(_this, void 0, void 0, function () {
            var staff;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.Staff.aggregate([
                            { $match: { roles: role } },
                            {
                                $lookup: query_1.lookupToRoles,
                            },
                        ])];
                    case 1:
                        staff = _a.sent();
                        return [2 /*return*/, staff];
                }
            });
        }); };
        /**
         * @access public dashboard
         */
        this.getPerson = function (query) { return __awaiter(_this, void 0, void 0, function () {
            var person;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.Staff.aggregate([
                            { $match: __assign({}, query) },
                            {
                                $lookup: query_1.lookupToRoles,
                            },
                        ])];
                    case 1:
                        person = (_a.sent())[0];
                        return [2 /*return*/, person];
                }
            });
        }); };
        /**
         * @access public cinemana-client
         */
        this.getPersonWithVideos = function (_id) { return __awaiter(_this, void 0, void 0, function () {
            var person;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.Staff.aggregate([
                            { $match: { _id: _id } },
                            {
                                $lookup: query_1.lookupToRoles,
                            },
                            {
                                $lookup: (0, query_1.lookupToVideos)('actors', 'actorVideos'),
                            },
                            {
                                $lookup: (0, query_1.lookupToVideos)('writers', 'writerVideos'),
                            },
                            {
                                $lookup: (0, query_1.lookupToVideos)('directors', 'dierctorVideos'),
                            },
                        ])];
                    case 1:
                        person = (_a.sent())[0];
                        if (!person)
                            return [2 /*return*/, null];
                        return [2 /*return*/, person];
                }
            });
        }); };
        this.Staff = _Staff;
    }
    return StaffService;
}());
exports.StaffService = StaffService;
