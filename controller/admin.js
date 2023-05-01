import Admin from '../model/admin.js'

export const createAdmin = async(req, res)=>{
    const data = req.body
    const newAdmin = new Admin(data) 
    try{
        await newAdmin.save();
        res.status(201).json(newAdmin)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}
export const updateadmin = async (req, res)=>{  
    const email = req.query.email
    // let email = req.params.email  
    let {name, phone,  password} = req.body
   
    try{ 
        if(name && phone && password){
            // const dt = await Admin.updateOne({email}, {$set: {name, phone,  password}});
            let dt = await Admin.findOneAndUpdate({email}, {$set: {name, phone,  password}}); 
            res.status(200).json({massege : "admin update successful"})
        }
        else{
            res.status(500).json({massege : "all feilds are required. (name / phone/ password)"})
        }
     
    }
    catch(err){
        res.status(500).json({message: err.message})
    } 
}

// export const getAdmin = async(req, res)=>{
//     try{
//         const admindata = await Admin.find({});
//         res.status(201).json(admindata)
//     } catch (err) {
//         res.status(500).json({message: err.message})
//     }
// }
export const loginAdmin = async(req, res)=>{
    const data = req.body 
    try{
        await Admin.findOne({email : data.email, password : data.password}).then((data)=>{
            if(data == null){
                res.status(500).json({message: "emai and password did not matched"})
            }else{
                res.status(200).json(data)
            }
        })
    }catch(err){
        res.status(err.code || 500).json({message: err})
    }
}
