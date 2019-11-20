const express = require("express");
const topicsRouter = express.Router();
const { sendAllTopics } = require("../controllers/topics-controller");

topicsRouter
  .route("/")
  .get(sendAllTopics)
  .all((req, res, next) => {
    res.status(405).send({ msg: "Method denied." });
  });

module.exports = topicsRouter;
