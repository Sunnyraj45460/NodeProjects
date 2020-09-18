const express=require('express')
const path=require("path")
const mongodb=require('mongodb')

const app=express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.set('view engine', 'ejs')
// app.set('views','ToDo/views')
const MangoClient=mongodb.MongoClient
const ObjectID=mongodb.ObjectID

dbURL="mongodb://localhost:27017/tododb"

MangoClient.connect(dbURL,{useNewUrlParser: true,useUnifiedTopology: true},(err,client)=>{
    if(err) throw err
    const db=client.db('tododb')
    const collection=db.collection('todos')
    app.locals.collection=collection
})

app.get('/t',(req,res)=>{
    const collection=req.app.locals.collection

    collection.find({})
    .toArray()
    .then(data=>{res.json(data)})
    .catch(err=>console.log(err))
})

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
})

app.post('/',(req,res)=>{
    const collection=req.app.locals.collection

    collection.insertOne(req.body)
    .then(data=>res.json(data))
    .catch(err=>console.log(err))
})

app.get('/del/:id',(req,res)=>{
    const collection=req.app.locals.collection

    collection.deleteOne({_id:ObjectID(req.params.id)})
    .then(data=>res.redirect('/'))
    .catch(err=>console.log(err))
})

app.get('/put/:id',(req,res)=>{
    res.sendFile(path.join(__dirname,'edit.html'));
})

app.put('/put/:id',(req,res)=>{
    const collection=req.app.locals.collection

    collection.replaceOne({_id:ObjectID(req.params.id)},req.body)
    .then(data=>'')
    .catch(err=>console.log(err))
})


app.listen(3000)