const express=require('express');

const router=express.Router();
const Person=require('./../models/Person');
const { route } = require('./menuRoutes');

//creation
router.post('/',async(req,res)=>{ 
  try{
    const data=req.body //Assuming the request body contains the person data

    //create a new person document  using the Mongoose model
    const newPerson=new Person(data);

    //save the new new person to the database
    const response=await newPerson.save(); //have to wait untill the newPerson is not saved
    console.log('data saved');
    res.status(200).json(response);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server error'});
  }
});

//reading..
router.get('/',async(req,res)=>{
  try{
    const data=await Person.find();
    console.log(data);
    res.status(200).json(data);
  }catch(err){
    console.log('failed');
    res.status(400).json({err:'error arised'})
  }
});

//routing
router.get('/:workType',async(req,res)=>{
  try{
    const workType=req.params.workType; //Extracting the work type from the URL which is variable
    if(workType==='chef' || workType==='waiter' || workType==='manager'){
      const response=await Person.find({work:workType});
      console.log('successfully fetched the data');
      res.status(200).json(response);
  }
  }catch(err){
    console.log('failed to get');
    res.status(500).json({err:'error occurred'});
  }
});

//update
router.put('/:id',async(req,res)=>{
  try{
    const userId=req.params.id;
    const newdata=req.body;  //the data to be updated;
    const response=await Person.findByIdAndUpdate(userId,newdata,{
      new:true, //return the updated doc
      runValidators:true, //Run Mongoose validation
    })
    console.log('data saved');
    res.status(200).json(response);
  }catch(err){
    console.log(err);
    res.status(500).json({err:'error occurred'});
  }
});

//Deleting
router.delete('/:id',async(req,res)=>{
  try{
    const personId=req.params.id;

    const response=await Person.findByIdAndDelete(personId);

    if(!response){
      return res.status(404).json({error:'error occured'});
    }
    console.log('data deleted successfully')
    res.status(200).json(response);
  }catch(err){
    console.log(err);
    res.status(500).json({err:'error occurred'});
  }
});


module.exports=router;