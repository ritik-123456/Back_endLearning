const express=require('express')
const app = express()
const db=require('./db')
const db2=require('./db2')
require('dotenv').config();
const bodyParser=require('body-parser');
app.use(bodyParser.json()); //req.body
const passport=require('./auth');

// const req = require('./req')

// console.log(req.string);
// console.log(req.a);
app.use(express.json())

//Middleware Function
const logRequest=(req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}] Request made to :${req.originalUrl}`);
  next(); //Move on to the next phase
}
app.use(logRequest);

app.use(passport.initialize());
const LocalAuthMiddleware=passport.authenticate('local',{session:false});

app.get('/',(req,res) => {
  res.send('Welcome to our hotel')
})

//POST ->used to create the database

const menuRoutes=require('./routes/menuRoutes');
app.use('/menu',menuRoutes);

const personRoutes=require('./routes/PersonRoutes');
app.use('/person',personRoutes);


const port=process.env.PORT||3000;

app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});

