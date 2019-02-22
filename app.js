const express = require("express");
const app = express();
const port = 3000;
const mollie = require("@mollie/api-client")({
  apiKey: "test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"
});

app.get("/", (req, res) => res.send("Hello World!"));
app.post("/", (req, res) => {
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
