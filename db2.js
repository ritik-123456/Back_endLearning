const mongoose=require('mongoose');

const URL='mongodb://127.0.0.1:27017/restaurants'

const db2=mongoose.createConnection(URL);

db2.on('connected',()=>{
    console.log('connected to Database');
});

db2.on('error',(err)=>{
    console.log('error occured',err);
});

db2.on('disconnected',()=>{
    console.log('disconnected');
});

module.exports=db2;