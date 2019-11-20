const express = require("express");
const usersRouter = express.Router();
const {
  sendAllUsers,
  sendUserById
} = require("../controllers/users-controller");

usersRouter
  .route("/")
  .get(sendAllUsers)
  .all((req, res, next) => {
    res.status(405).send({ msg: "Method denied." });
  });

usersRouter
  .route("/:username")
  .get(sendUserById)
  .all((req, res, next) => {
    res.status(405).send({ msg: "Method denied." });
  });

module.exports = usersRouter;
