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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUrlController = exports.shortenController = void 0;
const counterModel_1 = require("../models/counterModel");
const generateKey_1 = require("../lib/generateKey");
const urlModel_1 = require("../models/urlModel");
const shortenController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Here you would typically handle the logic for shortening a URL
        const { originalUrl } = req.body;
        if (!originalUrl) {
            return res.status(400).json({
                success: false,
                error: "Original URL is required",
            });
        }
        const count = yield counterModel_1.CounterModel.countDocuments();
        const counter = new counterModel_1.CounterModel({ val: count + 1 });
        yield counter.save();
        const shortenUrlKey = (0, generateKey_1.generateKey)(counter.val);
        const newUrl = yield urlModel_1.UrlModel.create({
            originalUrl,
            shortUrl: `${process.env.backendURL}/${shortenUrlKey}`,
        });
        yield newUrl.save();
        return res.status(201).json({
            success: true,
            message: "URL shortened successfully",
            data: {
                originalUrl: newUrl.originalUrl,
                shortUrl: newUrl.shortUrl,
            },
        });
    }
    catch (error) {
        console.error("Error in shortenController:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.shortenController = shortenController;
const fetchUrlController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { shortUrlKey } = req.body;
        if (!shortUrlKey) {
            return res.status(400).json({
                success: false,
                error: "Short URL key is required",
            });
        }
        const urlData = yield urlModel_1.UrlModel.findOne({ shortUrl: shortUrlKey });
        if (!urlData) {
            return res.status(404).json({
                success: false,
                error: "URL not found",
            });
        }
        return res.status(200).json({
            success: true,
            data: {
                originalUrl: urlData.originalUrl,
                shortUrl: urlData.shortUrl,
            }
        });
    }
    catch (error) {
        console.error("Error in fetchUrlController:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.fetchUrlController = fetchUrlController;
