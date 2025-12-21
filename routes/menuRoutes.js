const express=require('express')
const router=express.Router();

const MenuItem=require('./../models/Menu')
//creation for newMenuItem
//POST ->used to create the database
router.post('/',async(req,res)=>{
  try{
    const data=req.body;

    const newMenuItem=new MenuItem(data);

    const response=await newMenuItem.save();
    console.log('data saved');
    res.status(200).json(response); 
  }catch(err){
    console.log(err);
    res.status(500).json({error:'failed to save the data'});
  }
});

//reading
router.get('/',async(req,res)=>{
  try{
    const data=await MenuItem.find();
    console.log(data);
    res.status(200).json(data);
  }catch(err){
    console.log('failed to get',err);
    res.status(400).json({err:'error occurred'});
  }
});

//routing..
router.get('/:taste',async(req,res)=>{
  try{
    const tasteType=req.params.taste;
    if(tasteType==='sweet' || tasteType==='sour' || tasteType==='spicy'){
      const data=await MenuItem.find({taste:tasteType});
      console.log('data found');
      res.status(200).json(data);
    }
  }catch(err){
    console.log('failed to get',err);
    res.status(400).json({err:'error occurred'});
  }
})

module.exports=router;