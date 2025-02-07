const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require("bcrypt");
const employeeModel = require('./models/Employee')

const app = express()
app.use(express.json())
app.use(cors())

mongoose
   .connect("mongodb://127.0.0.1:27017/employee")

app.post('/register', async (req, res) => {
   const {name , email , password} = req.body;
   try {
      const user = await employeeModel.findOne({email});
      if(user) {
         return res.json({success:false , message:"Email Already Exists"});
      }
      const hashedPassword = await bcrypt.hash(password , 10);
      const newUser = new employeeModel({name , email , password:hashedPassword});
      await newUser.save();
      res.json({success:true , message: "Registered Successfully!"});

   }catch(err) {
      res.status(500).json({success:false , message:"Server Error"})
   }
})
app.post("/login", async (req, res) => {
   const { email, password } = req.body;
   try {
      const user = await employeeModel.findOne({ email });
      if (!user) {
         return res.json({ success: false, message: "User not found" });
      }
      const isMatch = await bcrypt.compare(password,user.password)
      if (!isMatch) {
         return res.json({ success: false, message: "Incorrect password" });
      }
      res.json({ success: true, message: "Success" });
   } catch (err) {
      res.status(500).json({ success: false, message: "Server error" });
   }
});
app.listen(3000, () => {
  console.log('Server is running...')
})
