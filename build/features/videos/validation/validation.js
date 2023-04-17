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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchSchema = exports.getSeriesSchema = exports.getMoviesSchema = exports.getVideoSchema = exports.editVideoSchema = exports.deleteVideoSchema = exports.addVideoSchema = void 0;
var zod_1 = __importDefault(require("zod"));
var helper_1 = require("./helper");
var isNumber_1 = require("@/utils/isNumber");
var _idSchema = zod_1.default
    .string({
    required_error: '_id required.',
    invalid_type_error: 'Invalid _id.',
})
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid _id.');
var video = {
    isPublic: zod_1.default.preprocess(helper_1.preProcessBoolean, zod_1.default.boolean({
        invalid_type_error: 'Public must be a boolean type.',
        required_error: 'Public is required.',
    })),
    title: zod_1.default
        .string({
        invalid_type_error: 'Title must be a string type.',
        required_error: 'Title is required.',
    })
        .trim()
        .min(1, 'Title is required.')
        .max(50, 'Title must not be greater than 50 characters.')
        .regex(/^[a-zA-Z0-9\s-\:]+$/, 'Use only [a-z, A-Z, 0-9, spaces, -, :] characters in title.'),
    description: zod_1.default
        .string({
        invalid_type_error: 'Description must be a string type.',
        required_error: 'Description is required.',
    })
        .trim()
        .min(25, 'Description must not be less than 25 characters.')
        .max(500, 'Description must not be greater than 500 characters.')
        .regex(/^[a-zA-Z0-9\s-\.\:'",]+$/, 'Use only [a-z, A-Z, 0-9, spaces, -, :, ., coma, ", \'] characters in description.'),
    type: zod_1.default.enum(['movie', 'series'], {
        invalid_type_error: 'Type is invalid.',
        required_error: 'Type is required.',
    }),
    stars: zod_1.default.preprocess(function (value) { return ((0, isNumber_1.isNumber)(value) ? Number(value) : value); }, zod_1.default
        .number({
        required_error: 'Stars is required.',
        invalid_type_error: 'Stars must be a number.',
    })
        .min(0, 'Stars must not be less than 0.')
        .max(10, 'Stars must not be greater than 10.')),
    releaseDate: zod_1.default.preprocess(helper_1.preProcessDate, zod_1.default.date({
        required_error: 'ReleaseDate is required.',
        invalid_type_error: 'Invalid date.',
    })),
    uploadDate: zod_1.default.preprocess(helper_1.preProcessDate, zod_1.default.date({
        required_error: 'UploadDate is required.',
        invalid_type_error: 'Invalid date.',
    })),
    isSpecial: zod_1.default.preprocess(helper_1.preProcessBoolean, zod_1.default.boolean({
        required_error: 'IsSpecial is required.',
        invalid_type_error: 'IsSpecial must be a boolean.',
    })),
    specialExpire: zod_1.default.preprocess(helper_1.preProcessDate, zod_1.default.date({
        required_error: 'SpecialExpire date is required.',
        invalid_type_error: 'Invalid date.',
    })),
    triler: zod_1.default
        .string({ required_error: 'Triler is required.' })
        .url('Invalid triler url.'),
    video: zod_1.default.string().url('Invalid triler url.').optional(),
    mainCategory: zod_1.default
        .string({
        required_error: 'Main category is required.',
        invalid_type_error: 'Invalid category.',
    })
        .regex(/^[0-9a-fA-F]{24}$/, 'Invalid category.'),
    categories: zod_1.default.preprocess(helper_1.preProcessArray, zod_1.default
        .array(zod_1.default
        .string({ invalid_type_error: 'Invalid category item.' })
        .regex(/^[0-9a-fA-F]{24}$/, 'Invalid category item.'), {
        required_error: 'Categories is required.',
        invalid_type_error: 'Categories must be an array.',
    })
        .min(1, 'Categories must have at least one category.')
        .max(15, 'Categories must not have more than 15 category.')),
    actors: zod_1.default.preprocess(helper_1.preProcessArray, zod_1.default
        .array(zod_1.default
        .string({ invalid_type_error: 'Invalid actor item.' })
        .regex(/^[0-9a-fA-F]{24}$/, 'Invalid actor item.'), {
        required_error: 'Actors is required.',
        invalid_type_error: 'Actors must be an array.',
    })
        .min(1, 'Actors must have at least one actor.')
        .max(50, 'Actors must not have more than 50 actor.')),
    directors: zod_1.default.preprocess(helper_1.preProcessArray, zod_1.default
        .array(zod_1.default
        .string({ invalid_type_error: 'Invalid director item.' })
        .regex(/^[0-9a-fA-F]{24}$/, 'Invalid director item.'), {
        required_error: 'Directors is required.',
        invalid_type_error: 'Directors must be an array.',
    })
        .min(1, 'Directors must have at least one director.')
        .max(5, 'Directors must not have more than 5 director.')),
    writers: zod_1.default.preprocess(helper_1.preProcessArray, zod_1.default
        .array(zod_1.default
        .string({ invalid_type_error: 'Invalid writer item.' })
        .regex(/^[0-9a-fA-F]{24}$/, 'Invalid writer item.'), {
        required_error: 'Writers is required.',
        invalid_type_error: 'Writers must be an array.',
    })
        .min(1, 'Writers must have at least one writer.')
        .max(5, 'Writers must not have more than 5 writer.')),
};
exports.addVideoSchema = zod_1.default.object({
    body: zod_1.default.object(__assign({}, video)),
});
exports.deleteVideoSchema = zod_1.default.object({
    params: zod_1.default.object({
        _id: _idSchema,
    }),
});
exports.editVideoSchema = zod_1.default.object({
    params: zod_1.default.object({
        _id: _idSchema,
    }),
    body: zod_1.default.object(__assign({}, video)),
});
exports.getVideoSchema = zod_1.default.object({
    params: zod_1.default.object({
        _id: _idSchema,
    }),
});
exports.getMoviesSchema = zod_1.default.object({
    query: zod_1.default.object({
        categoryId: _idSchema.optional(),
    }),
});
exports.getSeriesSchema = zod_1.default.object({
    query: zod_1.default.object({
        categoryId: _idSchema.optional(),
    }),
});
exports.searchSchema = zod_1.default.object({
    query: zod_1.default.object({
        title: video.title.optional(),
        type: video.type.optional(),
        category: _idSchema.optional(),
        year: zod_1.default
            .string({ invalid_type_error: 'Year must be a string.' })
            .regex(/^[0-9]{4},[0-9]{4}$/)
            .optional(),
        stars: video.stars.optional(),
    }),
});
