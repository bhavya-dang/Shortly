const express = require("express");
const router = express.Router();

const Url = require("../models/Url");

// @route     GET /:code
// @desc      Redirect to long/original URL
//code -> unique, shortened identifier for the url

router.get("/api/:code", async (req, res) => {
  console.log(req.params.code);
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    console.log("From index.js file = ", url);

    if (url) {
      res.redirect(url.longUrl);
    } else {
      return res.status(404).json("No url found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      err,
    });
  }
});

module.exports = router;
