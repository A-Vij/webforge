import mongoose from "mongoose";

const systemSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true
    },
    desc: { 
        type: String, 
        required: true, 
    },
    exp: { 
        type: Number, 
        required: true, 
    },
    topic: {
        type: String,
        required: true,
    }
});
const System = mongoose.model('System', systemSchema);

export default System;