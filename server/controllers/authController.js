const User = require('../models/UserModel');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(200).send({success:false, message: "User already exists" });
  }else{
    
      const newUser = new User({ name, email, password });
      await newUser.save();
      return res.status(200).send({success:true, message: "User registered" });

       
      
    
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try{
    const user = await User.findOne({ email, password });
    if (user) {
      return res.status(200).send({success:true, message: "User logged in" });
    }else{
      return res.send({success:false, message: "User not logged in" });
    }
  }catch(error){
    return res.status(400).send({success:false, message: "User not logged in" });
  }
}

module.exports = { registerUser, loginUser };