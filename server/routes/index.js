const express = require("express");
const router = express.Router();

const Url = require("../models/Url");
let totalRedirects = 0;

// @route     GET /:code
// @desc      Redirect to long/original URL
router.get("/api/:code", async (req, res) => {
  console.log(req.params.code);

  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (url) {
      // Update redirects count and redirect
      await url.updateOne({ $inc: { redirects: 1 } });
      totalRedirects++;

      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("No url found");
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// @route     GET /stats
// @desc      Get total URLs and redirects count
router.get("/stats", async (req, res) => {
  try {
    const totalUrls = await Url.countDocuments();
    console.log(totalUrls);

    if (totalUrls) {
      return res.json({
        totalUrls,
        totalRedirects,
      });
    } else {
      return res.status(404).json("No url found");
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
