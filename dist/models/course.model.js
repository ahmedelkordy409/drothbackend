"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const courseMetaSchema = new mongoose_1.Schema({
    level: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
    },
    price: Number,
    language: {
        type: String,
        enum: ['English', 'arabic'],
    },
    effort: Number,
    length: Number,
    transcript: {
        type: String,
        enum: ['English', 'arabic'],
    },
});
const prerequisiteSchema = new mongoose_1.Schema({
    tittle: {
        type: String,
    },
});
const courseSchema = new mongoose_1.Schema({
    tittle: String,
    cover: String,
    image: String,
    intro: String,
    description: String,
    slug: String,
    prerequisites: [prerequisiteSchema],
    rate: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
    // room user management
    meta: courseMetaSchema,
    instructors: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    students: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    program: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Program' },
    providers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Partener' }],
    subject: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Subject' },
    tags: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Tags' }],
    contents: { type: mongoose_1.Schema.Types.ObjectId, ref: 'CourseContent' },
    // course controll
    isDeleted: { type: Boolean, default: false },
});
exports.default = mongoose_1.default.model('Course', courseSchema);
//# sourceMappingURL=course.model.js.map