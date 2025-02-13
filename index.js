import dotenv from "dotenv"
import express from 'express'
import cors from 'cors'
import { User } from './schema.js'
import connectToDB from "./db.js"

const app = express()
dotenv.config({
    path:"./.env"
})

const port = process.env.PORT || 4000





app.use(express.json())
app.use(cors({
    origin:"https://how-landing-page.vercel.app",
    credentials:true
}))



app.post('/api/users/create-user', async(req, res) => {
   try {
   const {name,email,phone,message} = req.body
    
   if (!name || !email || !phone) {
      return res.status(400).json({status:false,message:"please enter all fields"})
   }

   const existingUser = await User.findOne({
    $or: [{ email }, { phone }]
   })

   if (existingUser) {
    return res.status(400).json({status:false,message:"User had already submited"})
   }

    const newUser =  new User({
        name,email,phone,message
    })

    await newUser.save()

    return res.status(201).json({status:true,message:"Thank you for submitted"})

   } catch (error) {
       console.log('error',error)
        return res.statusCode(500).json({status:false,message:"something went wronge"})
   }
})

app.get("/api",(req,res)=>{
    res.json({status:true,message:"data is coming"})
})

app.get("/",(req,res) =>{
    return res.send("data is coming")
})

const startServer = async() =>{

    await connectToDB()
    

    app.listen(port,()=>{
        console.log(`server listing on ${port}`)
    })
}


startServer()