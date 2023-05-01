import Youtube from '../model/youtube.js'


export const createyoutube = async(req, res)=>{
    const data = req.body  
    const newCategory = new Youtube(data) 
    try{
        await newCategory.save();
        res.status(201).json(newCategory)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
} 

export const getyoutube = async(req, res)=>{
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 50 
    let skip = (page - 1) * limit 
    try{
        const data = await Youtube.find({}).sort({createdAt : -1}).skip(skip).limit(limit)
        res.status(200).json(data)
    } catch(err){
        res.status(500).json({message: err.message})
    }
} 
export const deleteyoutube = async(req, res)=>{
    const _id = req.params.id 
    try{
        const videoData = await Youtube.findById({_id}).sort({createdAt : -1}); 
        await Youtube.deleteOne({_id})
        res.status(200).json(videoData)
    }
    catch(err){
        res.status(err.code || 409).json({message: err.message})
    }
}