const express = require('express')
const fs  = require('fs')
const mongoose = require('mongoose')
const app = express();
const port = 8001;
 
app.use(express.urlencoded({ extended: true }));
//Connection with database
mongoose
.connect('mongodb://127.0.0.1:27017/youtube-app-1')
.then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log("Mongo Error ", err));


//Schema
const userSchema = new mongoose.Schema({
    first_name : {
        type:String,
        required:true,
    },
    last_name : {
        type:String,
    },
    email:{
        type:String,
        required: true,
        unique:true,
        
    },
    job_title :{
        type:String,
    },
    gender :{
        type:String,
    }

},{timestamps:true});

const User = mongoose.model('user',userSchema);
//Routes
app.get("/users",async(req,res)=>{
    const allUsers = await User.find({});
    const html = `
    <ul>
    ${allUsers.map((user)=>`<li>${user.first_name}. ${user.last_name} - ${user.email}</li> `).join("")}
    </ul>
    `;
    res.send(html);
 })


 //Rest API

app.get("/api/users",async(req,res)=>{
    const allUsers = await User.find({});
    return res.json(allUsers);
})

app.route("/api/users/:id")
.get(async(req,res)=>{
   const user = await User.findById(req.params.id)
    // const user = users.find((users) =>users.id ===id )
    if(!user) return res.status(404).json({msg : "User doesnt exist"})
    // return res.json(user.first_name)
    return res.json(user)
})
.patch(async (req, res) => {
    try {
      const { id } = req.params;
  
      // Validate MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ status: "Failed", msg: "Invalid User ID" });
      }
      const updatedData = req.body; // Get dynamic fields from request body
      const user = await User.findByIdAndUpdate(id, updatedData, { new: true }); // `new: true` returns updated data
  
      // Check if user exists
      if (!user) {
        return res.status(404).json({ status: "Failed", msg: "User not found" });
      }
  
      // Return success response
      return res.json({ status: "Success", data: user });
  
    } catch (err) {
      // Handle unexpected errors
      return res.status(500).json({ status: "Failed", error: err.message });
    }
  })
  
.delete(async(req,res)=>{
        //To do :Delete the user using the id
       await User.findByIdAndDelete(req.params.id)
       return res.json({status:"Success"})
    //    if()
});


 app.post("/api/users",async(req,res)=>{
    //To do :create new user
    const body = req.body;
  
        if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
            return res.status(400).json({ msg :"All fields are required"})
        } 
   
       const result =  await User.create({
            first_name:body.first_name,
            last_name : body.last_name,
            email : body.email,
            gender : body.gender,
            job_title : body.job_title
        });
        console.log("result", result);
        
        return res.status(201).json({msg:"success",result})

});

app.listen(port,()=>console.log('Server started !')

);