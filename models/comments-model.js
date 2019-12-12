const connection = require("../connection");

exports.getAllComments = () => {
  // console.log("Comments model here.");
  return connection
    .select("*")
    .from("comments")
    .returning("*");
};

exports.patchCommentById = (comment_id, votes = 0) => {
  // console.log("Articles model here.");
  return connection
    .from("comments")
    .where("comment_id", comment_id)
    .increment({ votes: votes })
    .returning("*");
};

exports.destroyCommentbyId = comment_id => {
  // console.log("Comments model here.");
  return connection
    .from("comments")
    .where({ comment_id: comment_id })
    .delete();
};
