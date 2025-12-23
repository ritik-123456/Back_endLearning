const express=require('express');

const router=express.Router();
const Person=require('./../models/Person');
const { route } = require('./menuRoutes');
const {jwtAuthMiddleware,generateToken}=require('./../jwt');

//creation
router.post('/signup',async(req,res)=>{ 
  try{
    const data=req.body //Assuming the request body contains the person data

    //create a new person document  using the Mongoose model
    const newPerson=new Person(data);

    //save the new new person to the database
    const response=await newPerson.save(); //have to wait untill the newPerson is not saved
    console.log('data saved');

    //token generation while sign up
    //crating payload
    const payload={
      "id":response.id,
      "username":response.username
    }
    const token=generateToken(payload);
    console.log('token is',token);

    res.status(200).json({'response':response,'token':token});
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server error'});
  }
});

//for login
router.post('/login',async(req,res)=>{
  try{
    const {username,password}=req.body;

   const user=await Person.findOne({username:username});

   //If user doesnot exist
   if(!user || !(await user.comparePassword(password))){
    return res.status(401).json({error:'Invalid username or password'})
   }

   //generate Token
   const payload={
    id:user.id,
    username:user.username
   }
   const token=generateToken(payload);

   //return token as response
   res.json({token});
  }catch(err){
    console.log('login error',err);
    res.status(500).json({error:'Internal Server Error'});
  }
})

router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
  try{
    const userData=req.user;
    console.log("user Data",userData);

    const userId=userData.id;
    const user=await Person.findById(userId);

    res.status(200).json({user});

  }catch(err){
    console.log('login error',err);
    res.status(500).json({error:'Internal Server Error'});
  }
})

//reading..->to get the person details 
router.get('/',jwtAuthMiddleware,async(req,res)=>{
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