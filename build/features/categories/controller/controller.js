"use strict";
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
exports.CategoryController = void 0;
var httperror_1 = require("@/lib/httperror");
var convertToObjectId_1 = require("@/utils/convertToObjectId");
var CategoryController = /** @class */ (function () {
    function CategoryController(_categoryService) {
        var _this = this;
        this.addCategory = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var title, newCategory, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        title = req.body.title;
                        return [4 /*yield*/, this.categoryService.addCategory({ title: title })];
                    case 1:
                        newCategory = _a.sent();
                        res.status(201).json(newCategory);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.editCategory = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _id, title, editCategory, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        _id = (0, convertToObjectId_1.convertToObjectId)(req.params._id);
                        title = req.body.title;
                        return [4 /*yield*/, this.categoryService.editCategory(_id, {
                                title: title,
                            })];
                    case 1:
                        editCategory = _a.sent();
                        // throw HttpError if category not found
                        if (!editCategory) {
                            throw new httperror_1.HttpError({
                                status: httperror_1.statuses.Not_Found,
                                message: "Edit failed. Category with _id \"".concat(_id, "\" not found."),
                                feature: 'categories',
                            });
                        }
                        res.status(200).json(editCategory);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteCategory = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _id, deletedCategory, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        _id = (0, convertToObjectId_1.convertToObjectId)(req.params._id);
                        return [4 /*yield*/, this.categoryService.deleteCategory(_id)];
                    case 1:
                        deletedCategory = _a.sent();
                        // throw HttpError if category not found
                        if (!deletedCategory) {
                            throw new httperror_1.HttpError({
                                status: httperror_1.statuses.Not_Found,
                                message: "Delete failed. Category with _id \"".concat(_id, "\" not found."),
                                feature: 'categories',
                            });
                        }
                        res.status(200).json(deletedCategory);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getCategories = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var categories, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.categoryService.getCategories()];
                    case 1:
                        categories = _a.sent();
                        res.status(200).json(categories);
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.categoryService = _categoryService;
    }
    return CategoryController;
}());
exports.CategoryController = CategoryController;
