import Category from '../model/category.js'


export const createCategory = async(req, res)=>{
    const data = req.body 
    const newCategory = new Category(data) 
    try{
        await newCategory.save();
        res.status(201).json(newCategory)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
} 

export const getcategory = async(req, res)=>{
    try{
        const data = await Category.find({})
        res.status(200).json(data)
    } catch(err){
        res.status(500).json({message: err.message})
    }
}