const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res
      .status(200)
      .send({ success: false, message: "User already exists" });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      name: name,
      email: email,
      password: hash,
    });
    // const newUser = new User({ name, email, password });
    // await newUser.save();
    return res.status(200).send({ success: true, message: "User registered" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const tokenData = {
        id: user._id,
        user: user.name,
        email: user.email,
      };
      const token = jwt.sign(tokenData, "secret key", {
        expiresIn: "30d",
      });

      return res
        .status(200)
        .send({ success: true, message: "User logged in", token: token });
    } else {
      return res.send({ success: false, message: "User not logged in" });
    }
  } catch (error) {
    return res
      .status(400)
      .send({ success: false, message: "User not logged in" });
  }
};

const userData = async (req, res) => {
  try {
    res.status(200).send({ success: true, data: req.body.user });
  } catch (error) {
    res.status(400).send({ success: false, error: error });
  }
};




const updateUser = async (req, res) => {
  const { updateUser } = req.body;

  const email = updateUser.email;
  const userExists = await User.findOne({ email });

  if (userExists && (await bcrypt.compare(updateUser.cupassword, userExists.password))) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(updateUser.password, salt);
    User.findByIdAndUpdate(
      user._id,
      { name: updateUser.name,email: updateUser.email, password: hash },
      (err, doc) => {
        if (err) {
          return res.status(400).send({ success: false, message: err });
        } else {
          return res
            .status(200)
            .send({ success: true, message: "User updated" });
        }
      }
    );
    res.send("hello")
  }else{
    return res.status(400).send({ success: false, message: "User not updated" });
  }
};



module.exports = { registerUser, loginUser, userData, updateUser };
