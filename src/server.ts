import express from "express";
import { connectToDb } from "./db/connectToDb";
import {
  fetchUrlController,
  shortenController,
} from "./controllers/urlController";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

// Api Endpoints
app.get("/", (req, res) => {
  return res.send(
    `<center>
    <br><br><br><br><br><br><br><br><br><br><br><br><br>
    Welcome to the Zurl - URL Shortener API,<br>
    <br>
    A backend URL shortener service that takes a long, complex web address and converts it into a shorter, more manageable link.<br>
    This is useful for sharing links on social media, in emails, or anywhere else where space is limited.
    </center>
    `
  );
});

app.post("/shorten", shortenController);
app.get("/getUrl", fetchUrlController);

app.listen(PORT, () => {
  connectToDb();
  console.log(`Server is running on ${PORT}`);
});
