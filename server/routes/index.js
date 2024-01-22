const express = require("express");
const router = express.Router();

const Url = require("../models/Url");

// @route     GET /:code
// @desc      Redirect to long/original URL

router.get("/api/:code", async (req, res) => {
  // console.log(req.params.code);

  try {
    const url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("No url found");
    }
  } catch (err) {
    // console.error(err.message);
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
