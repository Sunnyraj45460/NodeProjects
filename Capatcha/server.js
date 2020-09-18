const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config({ path: 'Stripe_Payment/info.env' })
const { stringify } = require('querystring');
const app = express();

app.use(express.json());

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

app.post('/capatcha', async (req, res) => {
  if (!req.body.captcha){
    return res.json({ success: false});
  }
  // Secret key
  const secretKey = process.env.SECRET_KEY

  // Verify URL
  const query = stringify({
    secret: secretKey,
    response: req.body.captcha,
    remoteip: req.connection.remoteAddress
  });
  const verifyURL = `https://google.com/recaptcha/api/siteverify?${query}`;
  
  // Make a request to verifyURL
  const body = await fetch(verifyURL).then(res => res.json());
});

app.get('/capatcha/secret',(req,res)=>{res.send('Secret Area')})

app.listen(3000, () => console.log('Server started on port 3000'));
