const stripe = require('stripe')('sk_test_51HMSXEHwv4Ai7yZxQUm4Nqea8pocTShIvKMqhPSQZD3Di3ArlqL9IRfwbtxvgfxJ6Bc9wHjMMyD6jLSCfkiUqrGp00R270UvRD');
const express = require('express');
const app = express();
const path=require('path')
app.use(express.static('Stripe/public'));
const YOUR_DOMAIN = 'http://localhost:3000';

app.get('/create-session',(req, res)=>{
    res.sendFile(path.resolve("Stripe/public/index.html"))
})

app.post('/create-session', async (req, res) => {
    try{
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [
            {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: 'Stubborn Attachments',
                  images: ['https://i.imgur.com/EHyR2nP.png'],
                },
                unit_amount: 2000,
              },
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url: `${YOUR_DOMAIN}/success.html`,
          cancel_url: `${YOUR_DOMAIN}/cancel.html`,
        });
        res.json({ id: session.id });
    }
    catch(err){
        console.log(err);
    }
});
app.listen(3000, () => console.log('Running on port 3000'));