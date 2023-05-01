import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    tittle : {
        type : 'string',
        required : true, 
        unique : true
    },
    short_description : {
        type : 'string',
        required : true, 
    },
    description : {
        type : 'string',
        required : true, 
    },
    category : {
        type : 'string',
        required : true, 
    },
    reporter_id : {
        type : 'string',
        required : true, 
    },
    author : {
        type : 'string',
        required : true, 
    },
    slug : {
        type : 'string',
        required : true, 
    },
    status : {
        type : 'string',
        required : true, 
    },
    image1 : {
        type : 'string',
        required : true, 
    },
    image2 : {
        type : 'string', 
    },
    feature : {
        type : 'string', 
    },
    view : {
        type : 'string', 
    },
    images : {
        type : Array,
        required : true, 
    },
    },
    {timestamps: true}
)

const News = mongoose.model('news', newsSchema);

export default News;