// getting-started.js
import mongoose from "mongoose"


async function connectToDB() {
    try {
        mongoose.connection.on("connected",()=>{
            console.log('database connected successfully....... ')
        })
    
        mongoose.connection.on("error",(err)=>{
            console.log('Error in connecting to database....... ',err)
        })
    
    
         await mongoose.connect(process.env.MONGODBURI)
    
       

    } catch (error) {
        console.error("failed to connect with database",error)
        process.exit(1)
    }
  

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

export default connectToDB