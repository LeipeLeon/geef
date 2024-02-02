var express = require("express");
var router = express.Router();
const redirectTo = process.env.PARKING_REDIRECT_TO

/* GET home page. */
router.get("/*", (_req, res, _next) => {
  res.redirect(302, redirectTo)
});

/* POST home page. */
router.post("/*", (_req, res, _next) => {
  res.redirect(302, redirectTo)
});

module.exports = router;
