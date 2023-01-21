const User = require("../models/User");

const getUser = async (req, res) => {
  const user = await User.find({ id: req.params.googleId });

  return res.send({
    data: user,
    message: "Login Successful",
  });
};

const currentUser = (req, res) => {
  console.log("entrou no current user", req.user);
  return req.user;
};

const getListUsers = async (req, res) => {
  const users = await User.find().all();

  return res.send({
    data: users,
    message: "Login Successful",
  });
};

module.exports = { getUser, getListUsers, currentUser };
