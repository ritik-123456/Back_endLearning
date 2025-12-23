const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

//Define the Person schema
const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

//applying hashing+salt
personSchema.pre('save',async function(){
    const person=this; //storing the data in the person

    //since the middleware will run always will save operation as our requiremen is to hash only the password
    if(! person.isModified('password')) return ;
    try{
        //hash password generation
        //first creating salt
        const salt=await bcrypt.genSalt(10);

        //hashing password
        const hashedPassword=await bcrypt.hash(person.password,salt);
        
        //override the plain password with the hashed one
        person.password=hashedPassword;
    }
    catch(err){
        throw err;
    }
})

//let suppose database has password->ritik->bdcncpscscpsdndsjc
//login --->i entered password agarwal

//working
//bdcncpscscpsdndsjc->extract salt
//salt+agarwal -->hash --->acxsdnsjdniednied -->this is matched with older hash


personSchema.methods.comparePassword=async function(candidatePassword){
    try{
        const isMatch=await bcrypt.compare(candidatePassword,this.password); //extracts salt from  entered password
        return isMatch;
    }catch(err){
        throw err;
    }
}

//create Person Model

const Person=mongoose.model('Person',personSchema);
module.exports=Person;