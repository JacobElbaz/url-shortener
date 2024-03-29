require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

let urlArray = [];

app.post("/api/shorturl", (req, res) => {
  const urlRegex = /^(?:https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  if (!urlRegex.test(req.body.url)) return res.json({ error: "invalid url" });
  urlArray.push(req.body.url);
  res.json({ original_url: req.body.url, short_url: urlArray.length });
});

app.get("/api/shorturl/:url", (req, res) => {
  const url = parseInt(req.params.url);
  res.redirect(urlArray[url - 1]);
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
