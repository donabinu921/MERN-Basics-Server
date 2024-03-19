const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/Users');

const cors = require('cors');

app.use(express.json());
app.use(cors());

mongoose.connect(
    'mongodb+srv://username:password@cluster1.6lmwrxd.mongodb.net/merntutorial?retryWrites=true&w=majority&appName=Cluster1'
);

// app.get("/getUsers", (req, res) => {
//   UserModel.find({},(err, result) => {
//     if (err){
//       res.json(err);
//     }
//     else{
//       res.json(result);
//     }
//   });
// });

app.get("/getUsers", (req, res) => {
  UserModel.find({}).then(result => {
    res.json(result);
  }).catch(err => {
    console.error('Error fetching users:', err.message);
    //res.status(500).json({ error: 'Error fetching users' });
  });
});

app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
});

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
