const express=require('express')
const bcrypt = require('bcrypt')
const app=express()
const path=require("path")
const methodOverride=require('method-override')

app.use(express.json())
app.set('view engine','ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

users=[]

app.get('/register',(req,res)=>{
    res.render(path.resolve('Passport_Login/views/register'))
})

app.post('/register', async ({body},res)=>{
    try {
        const hashedPassword = await bcrypt.hash(body.password,10)
        users.push({
            id:Date.now(),
            name:body.name,
            email:body.email,
            password:hashedPassword
        })
        res.redirect('/login')
        console.log(users);
    }
    catch{
        res.redirect('/register')
    }
})

app.get('/login',(req,res)=>{
    res.render(path.resolve('Passport_Login/views/login'),{
        name:'Hello '+users[0].name
    })
})

app.post('/login', async ({body},res)=>{
    const validateEmail=body.email===users[0].email
    const validatePassword=await bcrypt.compare(body.password, users[0].password)

    if(!validateEmail){res.render(path.resolve('Passport_Login/views/login'),{
        name:'Email Id not Found '
    });return}
    else if(!validatePassword){res.render(path.resolve('Passport_Login/views/login'),{
        name:'Wrong Password'
    });return}
    res.redirect('/logout')
})

app.get('/logout',(req,res)=>{
    res.render(path.resolve('Passport_Login/views/logout'),{
        name:'Hello '+users[0].name
    })
})

app.delete('/logout',(req,res)=>{
    console.log(333);
    res.redirect('/login')
})
app.listen(3000)