const express = require('express')
// const mongodb=require('mongodb')
const mongoose = require('mongoose')
const shortId = require('shortid')

const app = express()
app.set('view engine', 'ejs')
app.set('views','Url_Shortener/views')
app.use(express.urlencoded({ extended: false }))

const shortUrlSchema = new mongoose.Schema({
    full: {
      type: String,
      required: true
    },
    short: {
      type: String,
      required: true,
      default: shortId.generate
    },
    clicks: {
      type: Number,
      required: true,
      default: 0
    }
})
const ShortUrl = mongoose.model('shorturl', shortUrlSchema)

mongoose.connect('mongodb://localhost/urlShort', {
  useNewUrlParser: true, useUnifiedTopology: true
})

app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find()
    res.render('index', { shortUrls: shortUrls })
})

app.post('/shortUrls', async (req, res) => {
  try{
    await ShortUrl.create({ full: req.body.fullUrl })
    res.redirect('/')
  }
  catch(err){
    console.log(err);
  }
})

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)
  
    shortUrl.clicks++
    shortUrl.save()

    res.redirect(shortUrl.full)
})

app.listen(3000);