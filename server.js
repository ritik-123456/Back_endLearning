const express=require('express')
const app = express()
const db=require('./db')
const db2=require('./db2')
require('dotenv').config();

const bodyParser=require('body-parser');
app.use(bodyParser.json()); //req.body

// const req = require('./req')

// console.log(req.string);
// console.log(req.a);
app.use(express.json())


app.get('/', (req, res) => {
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

