const User = require("../models/UserModel");
const Token = require("../models/tokenModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailSender = require("../config/mailSender");
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

    await mailSender(newUser, "verify-mail");
    
    return res.status(200).send({ success: true, message: "Please check your email and verify your account" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      if (user.isVerified) {
        
        const tokenData = {
          id: user._id,
          user: user.name,
          email: user.email,
        };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
          expiresIn: "30d",
        });
        
        return res
        .status(200)
        .send({ success: true, message: "User logged in", token: token });
      }else{
        return res
        .status(200)
        .send({ success: false, message: "Please verify your email" });
      }
    } else {
      return res.send({ success: false, message: "Email is not verified" });
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
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(updateUser.cupassword, user.password))) {
    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(updateUser.password, salt);

    try {
      await User.findByIdAndUpdate(user._id, {
        name: updateUser.name,
        email: updateUser.email,
        password: hashedPassword,
      });

      return res
        .status(200)
        .send({ success: true, msg: "Password updated successfully" });
    } catch (err) {
      return res.status(400).send({ msg: "Something went wrong" });
    }
  } else {
    return res.send({ msg: "No user or something went wrong" });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const tokenDetail = await Token.findOne({ token: req.body.token });
    // console.log(tokenDetail);
    if (tokenDetail) {
      await User.findOneAndUpdate({
        _id: tokenDetail.userid,
        isVerified: true,
      });
      await Token.findOneAndDelete({ token: req.body.token });
      res.send({ success: true, msg: "Email verified Successfully" });
    } else {
      res.send({ success: false, msg: "Invalid Token" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyEmail,
  userData,
  updateUser
};

