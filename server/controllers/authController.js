const User = require('../models/UserModel');

const registerUser = async (req, res) => {
  const { user, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(200).send({success:false, message: "User already exists" });
  }else{
    try{
       const newEntry = new User(req.body);
       newEntry.save();
       console.log(newEntry);
       return res.status(200).send({success:true, message: "User created" });
    }
    catch(err){
         return res.status(400).send({success:false, message: "User not created" });
    }
  }
};

module.exports = { registerUser };