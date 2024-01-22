const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortid = require("shortid");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
dotenv.config();

const Url = require("../models/Url");
const baseURL = "http://localhost:5173/"; //the url of the client app

// @route     POST /api/v1/url/shorten
// @desc      Create short URL
router.post("/shorten", async (req, res) => {
  let genId = uuidv4();
  let id = genId.substring(0, 3).slice(0, -1);
  const longUrl = req.body.longUrl;

  // Check base url
  if (!validUrl.isUri(baseURL)) {
    return res.status(401).json("Invalid base url");
  }

  // Create url code
  const urlCode = shortid.generate();
  const shortUrl = baseURL + "api/" + urlCode + id;

  // Check long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });
      if (url) {
        await url
          .updateOne({
            shortUrl,
            urlCode: urlCode + id,
          })
          .then(async () => {
            let docId = url._id;
            await Url.findOne({ _id: docId }).then((u) => res.json(u));
          });
        // console.log(shortUrl);
      } else {
        url = new Url({
          longUrl,
          shortUrl,
          urlCode: urlCode + id,
          date: new Date(),
        });

        await url.save();
        // console.log("Generated new url!", url);

        res.json(url);
      }
    } catch (err) {
      // console.error(err.message);
      res.status(500).json({
        message: err.message,
      });
    }
  } else {
    res.status(401).json("Invalid long url");
  }
});

// @route     GET /api/v1/url/link/:id
// @desc      Get short URL data by id
router.get("/link/:id", async (req, res) => {
  let { id } = req.params;
  let url = await Url.findOne({ _id: id });
  if (url) {
    res.json(url);
  } else return res.status(404).json("No url found");
});

// @route     GET /api/v1/url/links
// @desc      Get all short URLS
router.get("/links", async (req, res) => {
  let urls = await Url.find();
  if (urls) {
    // console.log(urls);
    res.json(urls);
  } else return res.status(404).json("No url found");
});

module.exports = router;
