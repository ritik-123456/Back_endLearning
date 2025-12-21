const mongoose=require('mongoose');
const db2 = require('../db2');

const WorkerSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    adhar_id:{
        type:String,
        required:true,
    },
    department:{
        type:String,
        required:true,
    },
    salary:{
        type:Number
    }
});

const worker=db2.model('worker',WorkerSchema);
module.exports=worker;