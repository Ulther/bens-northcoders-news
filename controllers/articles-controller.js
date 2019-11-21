const {
  getAllArticles,
  getArticleById,
  patchArticleById,
  addNewComment,
  getAllArticleComments
} = require("../models/articles-model");

// exports.sendAllArticles = (req, res, next) => {
//   // console.log("Articles controller here.");
//   getAllArticles()
//     .then(articles => {
//       res.status(200).send({ articles });
//     })
//     .catch(next);
// };

exports.sendArticleById = (req, res, next) => {
  // console.log("Articles controller here.");
  const { article_id } = req.params;
  getArticleById(article_id)
    .then(article => {
      res.status(200).send({ article });
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
        res.status(200).send({ article });
      }
    })
    .catch(next);
};

exports.postNewComment = (req, res, next) => {
  // console.log("Articles controller here.");
  const comment = req.body;
  addNewComment(comment)
    .then(comment => {
      // console.log("Back to Controller.");
      if (comment[0].author === null || comment[0].body === null) {
        res.status(400).send({ msg: "Bad Request." });
      } else {
        res.status(201).send({ comment });
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
      res.status(200).send({ articles });
    })
    .catch(next);
};
