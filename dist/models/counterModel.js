"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CounterModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const counterSchema = new mongoose_1.default.Schema({
    _id: {
        type: String,
        default: "urlCounter",
        required: true,
    },
    val: {
        type: Number,
        required: true,
        default: 0,
    },
    urlConnected: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Url",
    },
});
exports.CounterModel = mongoose_1.default.model("Counter", counterSchema);
