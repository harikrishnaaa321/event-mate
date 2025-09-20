import express from "express";
import User from "../Models/Auth.Model.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/GenerateToken.js";

const RegisterHandler = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  if (!username || !password || !email || !confirmPassword) {
    return res.status(201).json({ status: 201, message: "enter all details" });
  }
  if (password != confirmPassword) {
    return res
      .status(201)
      .json({ status: 201, message: "passwords dont match" });
  }
  const isUser = await User.findOne({ username });
  if (isUser) {
    return res
      .status(201)
      .json({ status: 201, message: "user already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  generateToken(username, res);
  return res.status(200).json({ status: 200, message: "created successfully" });
};

const LoginHandler = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(201).json({ status: 201, message: "enter all details" });
  }
  const isUser = await User.findOne({ username });
  if (!isUser) {
    return res.status(201).json({ status: 201, message: "user not exists" });
  } else {
    if (!(await bcrypt.compare(password, isUser.password))) {
      return res
        .status(201)
        .json({ status: 201, message: "passwords dont match" });
    }
    generateToken(isUser._id, res);
    return res.status(200).json({ status: 200, message: "login success" });
  }
};

const LogoutHandler = async (req, res) => {
  res.cookie("jwt", "", {
    maxAge: 0,
  });
  res.status(200).json({ status: 200, message: "loggout successfully" });
};
export { LoginHandler, RegisterHandler, LogoutHandler };
