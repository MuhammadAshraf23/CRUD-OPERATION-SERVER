const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const userModel=require('./Model/Users')
const dotenv = require("dotenv/config");

const app=express()
app.use(cors())
const PORT = 4000;
app.use(express.json())
mongoose.connect(process.env.DATABASE_URL)
//POSTUSER
app.post('/createUser', (req, res) => {
    userModel.create(req.body)
      .then(user => res.json(user))
      .catch(err => res.status(500).json({ error: err.message }));
  });
  //GETUSER
  app.get('/', (req, res) => {
    userModel.find({})
      .then(users => res.json(users))
      .catch(err => res.status(500).json({ error: err.message }));
  });
  //GETUSERID
  app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    userModel.findById(id)
      .then(user => {
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  });
  //UPDATEUSER
  app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    userModel.findByIdAndUpdate(id, { name: req.body.name, email: req.body.email, age: req.body.age }, { new: true })
      .then(user => {
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  });
  //DELETEUSER
  app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    userModel.findByIdAndDelete(id)
      .then(user => {
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  });
  
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
