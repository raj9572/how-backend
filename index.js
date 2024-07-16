import dotenv from "dotenv"
import express from 'express'
import cors from 'cors'
import { User } from './schema.js'
import connectToDB from "./db.js"

const app = express()
const port = process.env.PORT || 4000


dotenv.config({
    path:"./.env"
})


app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))



app.post('/api/users/create-contact', async(req, res) => {
   try {
   const {name,email,phone,message} = req.body
    
   if (!name || !email || phone) {
      return res.status(400).json({status:false,message:"please enter all fields"})
   }

   const existingUser = await User.findOne({
    $or:{
        email:email,
        phone:phone
    }
   })

   if (existingUser) {
    return res.status(400).json({status:false,message:"User had already submited"})
   }

    const newUser = await new User({
        name,email,phone,message
    })

    return res.statusCode(201).json({status:true,message:"Thank you for submitted"})

   } catch (error) {
       console.log('error',error)
        return res.statusCode(500).json({status:false,message:"something went wronge"})
   }
})

app.get("/",(req,res)=>{
    res.json({status:true,message:"data is coming"})
})


const startServer = async() =>{

    await connectToDB()
    

    app.listen(port,()=>{
        console.log(`server listing on ${port}`)
    })
}


startServer()