import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    tittle : {
        type : 'string',
        required : true,  
    },
    short_description : {
        type : 'string',
        required : true, 
    },
    description : {
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
    image : {
        type : 'string',
        required : true, 
    }, 
    },
    {timestamps: true}
)

const Event = mongoose.model('event', eventSchema);

export default Event;