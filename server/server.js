const express = require('express')
const cors = require('cors')
const path = require('path')
const User = require('../mongoose_model/model')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT || 3000
const CONNECTION_STRING = process.env.CONNECTION_STRING

app.use(express.json())
app.use(cors())
app.use(express.static("public"))

mongoose.connect(CONNECTION_STRING)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Error occurred:", err));

app.listen(PORT,()=>{
    console.log(`Server is listening at port ${PORT}`)
})

app.post('/user',async (req,res)=>{
    try{
        const newUser = new User(req.body);
        const insertData  = await newUser.save();
        res.status(200).json({
            message:"User was added to Database",
            insertedData: insertData
        })
    }catch(err){
        res.status(400).json({
            message:"User was not added to Database",
            error: err.message
        })
    }
})

app.get("/user", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "Users Found",
      allUsers: users,
    });
  } catch (err) {
    res.status(400).json({
      message: "Users not found",
      error: err.message,
    });
  }
});