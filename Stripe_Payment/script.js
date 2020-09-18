const express = require('express')
require('dotenv').config({ path: 'Stripe_Payment/info.env' })
const fs = require('fs')
const app = express()

app.use(express.static('Stripe_Payment/public'))
app.set('views','Stripe_Payment/views')
app.set('view engine','ejs')

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

app.get('/',(req,res)=>{
    fs.readFile('Stripe_Payment/items.json','utf8',(err,data)=>{
        res.render('index',{
            stripePublicKey: stripePublicKey,
            items:JSON.parse(data)
        })

    })
})

app.listen(3000)