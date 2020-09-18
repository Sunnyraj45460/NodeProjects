const express=require('express')
const bcrypt = require('bcrypt')
const app=express()
app.use(express.json())

users=[]

app.get('/users',(req,res)=>{
    res.status(200).send(users)
})

app.post('/users', async (req,res)=>{
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = { name: req.body.name, password: hashedPassword }
        users.push(user)
        res.status(201).send(user)
      } catch {
        res.status(500).send()
      }
})

app.post('/users/login', async (req,res)=>{
    const user=users.find(user => user.name===req.body.name)
    if(!user) return res.status(400).send('Cannot find user')

    try {
        if(await bcrypt.compare(req.body.password, user.password)) {
            res.send('Success')
        } else  return res.send('Not Allowed')
        
      } catch {
        res.status(500).send()
      }
})

app.listen(3000)