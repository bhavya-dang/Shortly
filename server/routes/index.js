const express = require("express");
const router = express.Router();

const Url = require("../models/Url");

// @route     GET /:code
// @desc      Redirect to long/original URL
router.get("/api/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (url) {
      // Update redirects count and redirect
      await url.updateOne({ $inc: { redirects: 1 } });

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
    const totalRedirects = await Url.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$redirects",
          },
        },
      },
    ]);
    if (totalUrls) {
      return res.json({
        totalUrls,
        totalRedirects: totalRedirects[0].total,
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
