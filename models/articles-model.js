const connection = require("../connection");

exports.getArticleById = article_id => {
  // console.log("Articles model here.");
  return connection
    .select("articles.*")
    .from("articles")
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .where("articles.article_id", article_id)
    .groupBy("articles.article_id")
    .count("comment_id as comment_count");
};

exports.patchArticleById = (article_id, votes = 0) => {
  // console.log("Articles model here.");
  return connection
    .from("articles")
    .where("article_id", article_id)
    .update({ votes: votes })
    .returning("*");
};

exports.addNewComment = body => {
  // console.log("Articles model here.");
  body.author = body.username;
  delete body.username;
  return connection
    .from("comments")
    .insert(body)
    .returning("*");
};

exports.getAllArticleComments = (sort_by, order) => {
  // console.log("Articles model here.");
  if (sort_by === undefined && order === undefined) {
    sort_by = "comment_id";
    order = "desc";
  }
  return connection
    .select("*")
    .from("comments")
    .orderBy(sort_by, order)
    .returning("*");
};

exports.getAllArticles = (topic, author, sort_by, order) => {
  // console.log("Articles model here.");
  if (sort_by === undefined && order === undefined) {
    sort_by = "created_at";
    order = "asc";
  }
  return connection
    .select("articles.*")
    .from("articles")
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .groupBy("articles.article_id")
    .count("comment_id as comment_count")
    .orderBy(sort_by, order)
    .returning("*")
    .modify(query => {
      if (author) query.where("articles.author", author);
      if (topic) query.where("articles.topic", topic);
    });
};
