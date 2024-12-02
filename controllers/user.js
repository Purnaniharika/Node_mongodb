const User = require("../models/user");

async function handleGetAllusers(req,res){
    const allDbUsers = await User.find({});
    return res.json(allDbUsers)
}

async function handleGetuserbyId(req,res){
    const user = await User.findById(req.params.id)
    // const user = users.find((users) =>users.id ===id )
    if(!user) return res.status(404).json({msg : "User doesnt exist"})
    // return res.json(user.first_name)
    return res.json(user)
}

async function  handleUpdateUserById(req,res) {
    try {
        const { id } = req.params;
        // // Validate MongoDB ObjectId
        // if (!mongoose.Types.ObjectId.isValid(id)) {
        //   return res.status(400).json({ status: "Failed", msg: "Invalid User ID" });
        // }
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
    
}

async function handleDeleteUserById(req,res){
 //To do :Delete the user using the id
 await User.findByIdAndDelete(req.params.id)
 return res.json({status:"Success"})
}
async function handleCreateUser(req,res){
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
}

module.exports ={
    handleGetAllusers,
    handleGetuserbyId,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateUser
}