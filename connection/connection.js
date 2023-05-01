import mongoose from 'mongoose';
import dotenv from 'dotenv';
// mongoose.set('strictQuery', true);
dotenv.config();

const db_url = process.env.DB_URL;

 const dbConnect = mongoose.connect(`${db_url}`).then(()=>{
    console.log("database connected ");
}).catch(err => console.log(err))

export default dbConnect;