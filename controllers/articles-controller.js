const {
  getAllArticles,
  getArticleById,
  patchArticleById,
  addNewComment,
  getAllArticleComments
} = require("../models/articles-model");

exports.sendArticleById = (req, res, next) => {
  // console.log("Articles controller here.");
  const { article_id } = req.params;
  getArticleById(article_id)
    .then(article => {
      if (article.length === 0) {
        res.status(404).send({ msg: "Id not found." });
      } else {
        res.status(200).send({ article: article[0] });
      }
    })
    .catch(next);
};

exports.updateArticleById = (req, res, next) => {
  // console.log("Articles controller here.");
  const { article_id } = req.params;
  const { inc_votes = 0 } = req.body;
  patchArticleById(article_id, inc_votes)
    .then(article => {
      if (article.length === 0) {
        res.status(404).send({ msg: "Id not found." });
      } else {
        res.status(200).send({ article: article[0] });
      }
    })
    .catch(next);
};

exports.postNewComment = (req, res, next) => {
  // console.log("Articles controller here.");
  const comment = req.body;
  const { article_id } = req.params;
  addNewComment(comment, article_id)
    .then(comment => {
      // console.log("Back to Controller.");
      if (comment[0].article_id === null) {
        res.status(404).send({ msg: "Not found." });
      }
      if (req.params.article_id && req.body.author && req.body.body)
        res.status(201).send({ comment });
      if (comment[0].author === null || comment[0].body === null) {
        res.status(400).send({ msg: "Bad Request." });
      }
    })
    .catch(next);
};

exports.sendAllArticleComments = (req, res, next) => {
  // console.log("Articles controller here.");
  const { sort_by, order } = req.query;
  const { article_id } = req.params;
  getAllArticleComments(sort_by, order, article_id)
    .then(comments => {
      // console.log("Articles controller return.");
      // console.log(article_id);
      if (req.params.article_id === article_id && comments.length === 0)
        res.status(200).send([]);
      if (comments.length === 0) res.status(404).send({ msg: "Not found." });
      if (req.params.article_id) res.status(200).send({ comments });
    })
    .catch(next);
};

exports.sendAllArticles = (req, res, next) => {
  // console.log("Articles controller here.");
  const { topic, author, sort_by, order } = req.query;
  getAllArticles(topic, author, sort_by, order)
    .then(articles => {
      // console.log("Articles controller return here.");
      if (articles.length === 0) res.status(404).send({ msg: "Not found." });
      res.status(200).send({ articles });
    })
    .catch(next);
};
