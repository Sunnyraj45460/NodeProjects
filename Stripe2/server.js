const express = require("express");
const app = express();
const { resolve } = require("path");
// This is your real test secret API key.
const stripe = require("stripe")("sk_test_....");

app.use(express.static("Stripe2/public"));
app.use(express.json());

const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.get('/create-payment-intent', (req, res) => {
  res.sendFile(resolve("Stripe2/public/checkout.html"))
})

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  customer = stripe.customer.create(
    email = request.POST["email"],
    name = request.POST["nickname"],
    source = request.POST["stripeToken"],
  )
  customer = stripe.customer.modify(
    customer.id,
    address = { "city": "mumbai", "country": "india", "line1": "unr", "line2": "thane", "postal_code": "421005", "state": "maharashtra" },
  )
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    customer: customer,
    currency: "usd"
  });

  res.send({
    clientSecret: paymentIntent.client_secret
  });
});

app.listen(3000, () => console.log('Node server listening on port 3000!'));
