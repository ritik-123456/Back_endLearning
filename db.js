const mongoose=require('mongoose');
require('dotenv').config() //must required for using dot env datas
//Defining URL
const mongoURL=process.env.LOCAL_DB  //local Server
//const mongoURL=process.env.MONGODB_URL;  //ONLINE SERVER

//seting up the connection
mongoose.connect(mongoURL
//     {
//         useNewUrlParser:true,
//         useUnifiedTopology :true,}
)

//mongoose maintains a default connection object representing the MongoDB connection
const db=mongoose.connection;

//defining the eventListener->these tells us whether the event has been performed or not

db.on('connected',()=>{
    console.log('connected to MongoDB Server');
});  

db.on('error',(err)=>{
    console.log('MongoDB connection error',err);
});

db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
});

//Export the database connection
module.exports=db;