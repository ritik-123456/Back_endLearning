const passport=require('passport');  //authentication
const LocalStrategy=require('passport-local').Strategy;

const Person=require('./models/Person');

//authentication
passport.use(new LocalStrategy(async(USERNAME,password,done)=>{
  //authentication Logic
  try{
    console.log('Received credentials:',USERNAME,password);
    const user=await Person.findOne({username:USERNAME}); //it will get the data with the username
    if(!user)
      return done(null,false,{message:'Incorrect username'});

    const isPasswordMatch=await user.comparePassword(password);//await required 
    if(isPasswordMatch){
      return done(null,user);
    }else{
      return done(null,false,{message:'Incorrect password'});
    }
  }catch(err){
    return done(err);
  }
}))

module.exports=passport; //Export configured password