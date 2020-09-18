const express=require('express')
const path=require("path")
const expressSession=require('express-session')
const flash = require('express-flash')
const app=express()
const passport=require('passport')
const passportLocal=require('passport-local')

const users=[{
    id:112,
    username:"Sunny",
    password:"dontknow"
}]

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const MangoClient=require('mongodb').MongoClient
const ObjectID=require('mongodb').ObjectID

app.set('view engine','ejs')

app.use(flash())
app.use(expressSession({
    secret:'dklfjsk',
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/',(req,res)=>{
    req.session.viewcount+=1
    res.render(path.resolve('Test/views/test'),{viewcount:req.session.viewcount})
})

var LocalStrategy = passportLocal.Strategy

const func=username => users.find(user => user.username == username)

passport.use(new LocalStrategy(
    // {usernameField:"username", passwordField:"password"},
    (username,password,done)=>{
        const user = func(username)
        if (!user) {
            return done(null, false, { message: 'No user with that email' })
        }
        else if (user.password==password) {
            return done(null, user)
        } 
        else {
            return done(null, false, { message: 'Password incorrect' })
        }    
    }    
))

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    done(null,{id})
})

app.get('/login',(req,res)=>{
    res.render(path.resolve('Test/views/login'),{
    })
})

app.post('/login', passport.authenticate('local',{failureFlash:true}),
 (req,res,next)=>{
    res.redirect('/secret')
})

function ensure(req,res,next){
    if(req.isAuthenticated())return next()
    res.redirect('/login')
}

app.get('/secret',ensure,(req,res)=>{
    res.send('secret area')
})

dbURL="mongodb://localhost:27017/blogdb"

MangoClient.connect(dbURL,{useNewUrlParser: true, useUnifiedTopology: true},(err,client)=>{
    if(err){throw err}
    const db=client.db('blogdb')
    const collection=db.collection('posts')
    app.locals.collection=collection
})

app.get('/mongo',(req,res)=>{
    const collection=req.app.locals.collection
    collection.find({})
    .toArray()
    .then(data=>res.json(data))
    .catch(err=>console.log(err))
})

app.get('/mongo/:id',(req,res)=>{
    const collection=req.app.locals.collection

    collection.findOne({_id:ObjectID(req.params.id)})
    .then(data=>res.json(data))
    .catch(err=>console.log(err))
})

app.post('/mongo',(req,res)=>{
    const collection=req.app.locals.collection

    collection.insert(req.body)
    .then(data=>res.json(data))
    .catch(err=>console.log(err))
})

app.patch('/mongo/:id',(req,res)=>{
    const collection=req.app.locals.collection
    const nN=req.body.nN

    collection.updateOne(
        {_id:ObjectID(req.params.id)},{$set:{name:nN}}
        )
    .then(data=>res.json(data))
    .catch(err=>console.log(err))
})

app.put('/mongo/:id',(req,res)=>{
    const collection=req.app.locals.collection

    collection.replaceOne({_id:ObjectID(req.params.id)},req.body)
    .then(data=>res.json(data))
    .catch(err=>console.log(err))
})

app.delete('/mongo/:id',(req,res)=>{
    const collection=req.app.locals.collection

    collection.deleteOne({_id:ObjectID(req.params.id)})
    .then(data=>res.json(data))
    .catch(err=>console.log(err))
})

app.listen(3000)