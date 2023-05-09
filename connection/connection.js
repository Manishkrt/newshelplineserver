import mongoose from 'mongoose';
import dotenv from 'dotenv';
// mongoose.set('strictQuery', true);
dotenv.config();
 

 const dbConnect = mongoose.connect("mongodb+srv://newshelpline:newshelpline@newshelpline.lan36qb.mongodb.net/newshelpline?retryWrites=true&w=majority").then(()=>{
    console.log("database connected ");
}).catch(err => console.log(err))

export default dbConnect;