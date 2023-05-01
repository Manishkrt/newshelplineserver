import mongoose from 'mongoose';

const reporterSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true,
    },
    email: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true,
    },
    image: {
        type: 'string',
        required: true,
    },
    phone: {
        type: 'string',
        required: true,
    },
    adhar: {
        type: 'string',
        required: true,
    },
    dob: {
        type: 'string',
        required: true,
    },
    gender: {
        type: 'string',
        required: true,
    },
    designation: {
        type: 'string',
        required: true,
    },
    address: {
        type: 'string',
        required: true,
    },
    status: {
        type: 'string',
        required: true,
    }, 
    otp: {
        type: 'string', 
    }
    },
    {timestamps: true}
); 

const reporter = mongoose.model('reporter', reporterSchema);

export default reporter 