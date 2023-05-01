import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import './connection/connection.js'
import reporterroute from './routes/reporter.js'
import categoryroute from './routes/category.js'
import adminroute from './routes/admin.js' 
import newsroute from './routes/news.js' 
import eventroute from './routes/event.js' 
import youtuberoute from './routes/youtube.js' 

dotenv.config();
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8181;  
const app = express();
 
// middle ware 
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/public", express.static(__dirname + '/public'));
 

// routes 

app.use('/reporter',  reporterroute)
app.use('/category',  categoryroute)
app.use('/admin',  adminroute) 
app.use('/news',  newsroute) 
app.use('/event',  eventroute) 
app.use('/youtube',  youtuberoute) 

  
// server port 
app.listen(PORT, (req, res)=>{
    console.log("server is started on port " + PORT); 
});