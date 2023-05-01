import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name : {
        type : 'string',
        required : true, 
    },
    email : {
        type : 'string',
        required : true,
        unique : true
    },
    phone : {
        type : 'string',
        required : true, 
    },
    password : {
        type : 'string',
        required : true, 
    }
})

const Admin = mongoose.model('admin', adminSchema);

export default Admin;