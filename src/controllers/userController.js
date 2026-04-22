const userModel = require("../models/userModel");

const getUsers = (req, res) => {
  const users = userModel.findAll();

  res.status(200).json({
    success: true,
    data: users,
  });
};

module.exports = {
  getUsers,
};
