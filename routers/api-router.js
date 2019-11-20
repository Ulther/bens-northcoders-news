const express = require("express");
const apiRouter = express.Router();

const topicsRouter = require("./topics-router");
const usersRouter = require("./users-router");
const articlesRouter = require("./articles-router");
const commentsRouter = require("./comments-router");

apiRouter.use("/topics", topicsRouter);

apiRouter.use("/users", usersRouter);

apiRouter.use("/articles", articlesRouter);

apiRouter.use("/comments", commentsRouter);

apiRouter.route("/teapot").all((req, res, next) => {
  res.status(418).send({ msg: "I'm a teapot." });
});

module.exports = apiRouter;
