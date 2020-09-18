const express = require('express')
const passport = require('passport')
const app = express()
const mongoose = require('mongoose')
const session=require('express-session')
require('./auth')(passport)

const MongoStore = require('connect-mongo')(session)
const connectDB = require('./db')

connectDB()

app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
)

app.use(passport.initialize())
app.use(passport.session())
app.get('/login',passport.authenticate('google', { scope: ['profile'] }))

// app.post('/login/cb', passport.authenticate('google', {
//   session: false
// })
// );

app.get('/login/cb', 
  passport.authenticate('google', { failureRedirect: '/gg' }),
  (req, res)=>{
    res.redirect('/logged')
})

app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/login')
})

app.listen(3000)