var express = require("express");
var router = express.Router();
const mollie = require("@mollie/api-client")({
  apiKey: process.env.MOLLIE_API_KEY
});

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Hello" });
});
router.post("/", (req, res) => {
  mollie.payments
    .create({
      amount: {
        value: req.body.price,
        currency: "EUR"
      },
      description: "Gift Optocht Pampus Lollebroek",
      redirectUrl: process.env.DOMAIN + "/thx",
      webhookUrl: process.env.DOMAIN + "/webhook"
    })
    .then(payment => {
      res.redirect(payment.getPaymentUrl());
    })
    .catch(err => {
      // Handle the error
    });
});

module.exports = router;
