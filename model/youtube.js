import mongoose from "mongoose";

const youtubeSchema = new mongoose.Schema({
    tittle : {
        type : 'string',
        // required : true,  
    },
    embed : {
        type : 'string',
        required : true, 
    },
    video : {
        type : 'string',
        required : true, 
    }, 
    },
    {timestamps: true}
)

const youtube = mongoose.model('youtube', youtubeSchema);

export default youtube;