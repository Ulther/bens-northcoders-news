const express = require("express");
const commentsRouter = express.Router();
const {
  sendAllComments,
  updateCommentById,
  deleteCommentbyId
} = require("../controllers/comments-controller");

commentsRouter
  .route("/")
  .get(sendAllComments)
  .all((req, res, next) => {
    res.status(405).send({ msg: "Method denied." });
  });

commentsRouter
  .route("/:comment_id")
  .patch(updateCommentById)
  .delete(deleteCommentbyId)
  .all((req, res, next) => {
    res.status(405).send({ msg: "Method denied." });
  });

module.exports = commentsRouter;
