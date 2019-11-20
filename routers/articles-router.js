const express = require("express");
const articlesRouter = express.Router();
const {
  sendAllArticles,
  sendArticleById,
  updateArticleById,
  postNewComment,
  getAllArticleComments
} = require("../controllers/articles-controller");

articlesRouter
  .route("/")
  .get(sendAllArticles)
  .all((req, res, next) => {
    res.status(405).send({ msg: "Method denied." });
  });

articlesRouter
  .route("/:article_id")
  .get(sendArticleById)
  .patch(updateArticleById)
  .all((req, res, next) => {
    res.status(405).send({ msg: "Method denied." });
  });

articlesRouter
  .route("/:article_id/comments")
  .post(postNewComment)
  .get(getAllArticleComments)
  .all((req, res, next) => {
    res.status(405).send({ msg: "Method denied." });
  });

module.exports = articlesRouter;
