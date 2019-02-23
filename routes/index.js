var express = require("express");
var router = express.Router();
const mollie = require("@mollie/api-client")({
  apiKey: process.env.MOLLIE_API_KEY
});

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index");
});
router.post("/", (req, res) => {
  mollie.payments
    .create({
      amount: {
        value: req.body.price,
        currency: "EUR"
      },
      description: "Gift Optocht Pampus Lollebroek",
      redirectUrl: process.env.DOMAIN + "/thanks",
      webhookUrl: "https://geef.pampus-lollebroek.nl/webhook"
    })
    .then(payment => {
      res.redirect(payment.getPaymentUrl());
    })
    .catch(err => {
      res.send(err);
    });
});
router.get("/thanks", (req, res, next) => {
  // res.render("index", { title: "Hello" });
  // res.send([req.body, req.params]);
  res.render("thanks", {
    title: "Bedankt!",
    number: Math.floor(Math.random() * 5) + 1
  });
});

module.exports = router;

// set session in cookie
// do pingback to Mollie
