const { getAllUsers, getUserById } = require("../models/users-model");

exports.sendAllUsers = (req, res, next) => {
  // console.log("Users controller here.");
  getAllUsers()
    .then(users => {
      res.status(200).send({ users });
    })
    .catch(next);
};

exports.sendUserById = (req, res, next) => {
  // console.log("Users controller here.");
  const { username } = req.params;
  getUserById(username)
    .then(user => {
      if (!user) {
        res.status(404).send({ msg: "Username not found." });
      } else {
        res.status(200).send({ user });
      }
    })
    .catch(next);
};
