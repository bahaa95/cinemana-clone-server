"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Staff = void 0;
var mongoose_1 = require("mongoose");
var StaffSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    image: {
        publicId: { type: String, default: null },
        url: { type: String, default: null },
    },
    roles: [mongoose_1.Types.ObjectId],
});
exports.Staff = (0, mongoose_1.model)('Staff', StaffSchema, 'staff');
