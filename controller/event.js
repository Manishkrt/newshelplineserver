// import EventView from '../../news_helpline/src/Component/Admin/EventView.jsx'
import Event from '../model/event.js'


export const createEvent = async(req, res)=>{
    const file = req.files
    const data = req.body
    const description = req.body.description
    let slug = req.body.tittle
        slug = slug.split(" ").join("-")
        slug = slug.split("/").join("|")
        slug = slug.split("?").join("")
    var fullUrl = req.protocol + '://' + req.get('host');    
    try{
        const image = `${fullUrl}/${file.image[0].path}` 
            let alldata = Object.assign(data, {description, slug, image});
            const newNews = new Event(alldata) 
            await newNews.save();
            res.status(201).json(newNews)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

export const getEvent = async (req, res) => { 
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 100 
    let skip = (page - 1) * limit 
    try{
        const eventdata = await Event.find({}).sort({createdAt : -1}).skip(skip).limit(limit);  
        res.status(200).json(eventdata)
    }
    catch(err){
        res.status(500).json({message: err.message})
    } 
}

export const editEvent = async(req, res)=>{
    const _id = req.params.id 
    try{
        const data = await Event.findById({_id}) 
        res.status(200).json(data)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}

export const updateEvent = async (req, res)=>{ 
    const file = req.files  
    let slug = req.body.tittle
        slug = slug.split(" ").join("-")
        slug = slug.split("/").join("|")
        slug = slug.split("?").join("")
    var fullUrl = req.protocol + '://' + req.get('host');
    let {tittle, description, short_description, image } = req.body  
    let _id = req.params.id 
    // console.log(req.body)
    console.log("file", file)
    if(file.image){
        image = `${fullUrl}/${file.image[0].path}` 
    } 
   
    try{ 
        
        await Event.updateOne({_id}, {$set: {tittle, description, short_description, image, slug}});
        const Productdata = await Event.findById({_id});
        res.status(200).json(Productdata) 
    }
    catch(err){
        res.status(500).json({message: err.message})
    } 
}

export const deleteEvent = async(req, res)=>{
    const _id = req.params.id 
    try{ 
        const Productdata = await Event.findById({_id}); 
        await Event.deleteOne({_id})
        res.status(200).json(Productdata)
    }
    catch(err){
        res.status(err.code || 409).json({message: err.message})
    }
}

export const searchEvent = async(req, res)=>{ 
    const key = req.params.key  
    try{
        const data = await Event.find({$or: [
            {tittle : {$regex: key}},
            {short_description : {$regex: key}},
            {description : {$regex: key}} 
        ]}); 
        res.status(200).json(data)
    }
    catch(err){
        res.status(err.code || 409).json({message: err.message})
    }
}
 