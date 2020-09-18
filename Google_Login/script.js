const express = require('express')
const passport = require('passport')
const app = express()
const dotenv = require('dotenv')
dotenv.config({ path: 'Google_Login/.env' })

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
      console.log(profile)
  }
))

app.use(passport.initialize())
app.use(passport.session())
app.get('/auth/google',passport.authenticate('google', { scope: ['profile'] }))

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/gg' }),
  function(req, res) {
    res.redirect('/dashboard')
})

app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/auth/google')
})

app.listen(3000)