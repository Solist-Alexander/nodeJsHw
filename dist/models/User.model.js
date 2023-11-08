"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const gender_enum_1 = require("../enums/gender.enum");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    age: {
        type: Number,
        min: [1, 'min age is 1'],
        max: [199, 'max age is 199']
    },
    genders: {
        type: String,
        enum: gender_enum_1.EGengers
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    }
});
exports.User = (0, mongoose_1.model)("user", userSchema);
