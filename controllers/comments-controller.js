const {
  getAllComments,
  patchCommentById,
  destroyCommentbyId
} = require("../models/comments-model");

exports.sendAllComments = (req, res, next) => {
  // console.log("Comments controller here.");
  getAllComments()
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.updateCommentById = (req, res, next) => {
  // console.log("Comments controller here.");
  const { comment_id } = req.params;
  const { inc_votes = 0 } = req.body;
  patchCommentById(comment_id, inc_votes)
    .then(comment => {
      if (comment.length === 0) {
        res.status(404).send({ msg: "Id not found." });
      } else {
        res.status(200).send({ comment });
      }
    })
    .catch(next);
};

exports.deleteCommentbyId = (req, res, next) => {
  // console.log("Comments controller here.");
  const { comment_id } = req.params;
  destroyCommentbyId(comment_id)
    .then(() => {
      res.status(204).send({ msg: "Comment destroyed." });
    })
    .catch(next);
};
