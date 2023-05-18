import News from '../model/news.js'


export const createNews = async(req, res)=>{
    const file = req.files
    const data = req.body
    const description = req.body.description
    let slug = req.body.tittle
        slug = slug.split(" ").join("-")
        slug = slug.split("/").join("|")
        slug = slug.split("?").join("")
    var fullUrl = req.protocol + '://' + req.get('host');   
    try{
        if(file.image2){ 
            const image1 = `${fullUrl}/${file.image1[0].path}`
            const image2 = `${fullUrl}/${file.image2[0].path}`
            const images = [image1, image2]
            let alldata = Object.assign(data, {description, slug,image1, image2, images});
            const newNews = new News(alldata) 
            await newNews.save();
            res.status(201).json(newNews)
        }
        else{
            const image1 = `${fullUrl}/${file.image1[0].path}`
            const images = [image1]
            let alldata = Object.assign(data, {description, slug, image1, images});
            const newNews = new News(alldata) 
            await newNews.save();
            res.status(201).json(newNews)
        } 
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

export const getnews = async (req, res) => { 
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 500 
    let skip = (page - 1) * limit 
    try{
        const reporternewsdata = await News.find({}).sort({createdAt : -1}).skip(skip).limit(limit);  
        res.status(200).json(reporternewsdata)
    }
    catch(err){
        res.status(500).json({message: err.message})
    } 
}

export const editnews = async(req, res)=>{
    const _id = req.params.id 
    try{
        const data = await News.findById({_id}) 
        res.status(200).json(data)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}
export const updatenews = async (req, res)=>{ 
    const file = req.files  
    let slug = req.body.tittle
        slug = slug.split(" ").join("-")
        slug = slug.split("/").join("|")
        slug = slug.split("?").join("")
    var fullUrl = req.protocol + '://' + req.get('host');
    let {tittle, category, description, short_description, image1, image2, feature } = req.body  
    let _id = req.params.id 
    if(file.image1){
        image1 = `${fullUrl}/${file.image1[0].path}` 
    }

    if(file.image2){
        image2 = `${fullUrl}/${file.image2[0].path}`
    }
   
    try{ 
        
        if(image2.length > 10){
            let images = [image1, image2] 
            await News.updateOne({_id}, {$set: {tittle, category, description, short_description, image1, image2, slug, images, feature}});
        }
        else{  
            await News.updateOne({_id}, {$set: {tittle, category, description, short_description, image1,  slug, feature}});
        } 
    res.status(200).json(req.body) 
    }
    catch(err){
        res.status(500).json({message: err.message})
    } 
}

export const deletenews = async(req, res)=>{
    const _id = req.params.id 
    try{
        const Productdata = await News.findById({_id}); 
        await News.deleteOne({_id})
        res.status(200).json(Productdata)
    }
    catch(err){
        res.status(err.code || 409).json({message: err.message})
    }
}
export const viewnews = async(req, res)=>{
    const {view} = req.body
    const _id = req.params.id 
    try{
        await News.updateOne({_id}, {$set: {view}});
        const Productdata = await News.findById({_id}); 
        res.status(200).json(Productdata)
    }
    catch(err){
        res.status(err.code || 409).json({message: err.message})
    }
}
export const statusnews = async(req, res)=>{
    const {status} = req.body
    const _id = req.params.id 
    try{
        await News.updateOne({_id}, {$set: {status}});
        const Productdata = await News.findById({_id}); 
        res.status(200).json(Productdata)
    }
    catch(err){
        res.status(err.code || 409).json({message: err.message})
    }
}
export const searchNews = async(req, res)=>{ 
    const key = req.params.key  
    try{
        const data = await News.find({$or: [
            {tittle : {$regex: key}},
            {short_description : {$regex: key}},
            {description : {$regex: key}},
            {category : {$regex: key}},
            {feature : {$regex: key}}
        ]}); 
        res.status(200).json(data)
    }
    catch(err){
        res.status(err.code || 409).json({message: err.message})
    }
}


