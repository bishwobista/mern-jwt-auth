const User = require('../models/UserModel');

const registerUser = async (req, res) => {
  const { user, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).send({ message: "User already exists" });
  }else{
    try{
       const newEntry = new User(req.body);
       newEntry.save();
       console.log(newEntry);
       return res.status(200).send({ message: "User created" });
    }
    catch(err){
         return res.status(400).send({ message: "User not created" });
    }
  }
};
