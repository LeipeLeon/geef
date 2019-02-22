var express = require("express");
var router = express.Router();
const mollie = require("@mollie/api-client")({
  apiKey: "test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"
});

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Hello" });
});
router.post("/", (req, res) => {
  mollie.payments
    .create({
      amount: {
        value: "10.00", // params value
        currency: "EUR"
      },
      description: "Pampus Lollebroek",
      redirectUrl: "https://geef.pampus-lollebroek.nl/thx",
      webhookUrl: "https://geef.pampus-lollebroek.nl/webhook"
    })
    .then(payment => {
      res.send(payment.getPaymentUrl());
    })
    .catch(err => {
      // Handle the error
    });
});

module.exports = router;
