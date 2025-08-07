"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connectToDb_1 = require("./db/connectToDb");
const urlController_1 = require("./controllers/urlController");
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
// Api Endpoints
app.get("/", (req, res) => {
    return res.send(`<center>
    <br><br><br><br><br><br><br><br><br><br><br><br><br>
    Welcome to the Zurl - URL Shortener API,<br>
    <br>
    A backend URL shortener service that takes a long, complex web address and converts it into a shorter, more manageable link.<br>
    This is useful for sharing links on social media, in emails, or anywhere else where space is limited.
    </center>
    `);
});
app.post("/shorten", urlController_1.shortenController);
app.get("/getUrl", urlController_1.fetchUrlController);
app.listen(PORT, () => {
    (0, connectToDb_1.connectToDb)();
    console.log(`Server is running on ${PORT}`);
});
