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

exports.addNewComment = (body, article_id) => {
  // console.log("Articles model here.");
  body.article_id = article_id;
  body.author = body.username;
  delete body.username;
  return connection
    .from("comments")
    .insert(body)
    .returning("*");
};

exports.getAllArticleComments = (sort_by, order, article_id) => {
  // console.log("Articles model here.");
  if (sort_by === undefined) {
    sort_by = "created_at";
  }
  if (order === undefined) {
    order = "desc";
  }
  if (
    sort_by !== "comment_id" &&
    sort_by !== "article_id" &&
    sort_by !== "body" &&
    sort_by !== "votes" &&
    sort_by !== "author" &&
    sort_by !== "created_at"
  ) {
    sort_by = "created_at";
  }
  if (order !== "asc" && order !== "desc") {
    order = "desc";
  }
  return connection
    .select("*")
    .from("comments")
    .where("comments.article_id", article_id)
    .orderBy(sort_by, order)
    .returning("*");
};

exports.getAllArticles = (topic, author, sort_by, order) => {
  // console.log("Articles model here.");
  if (sort_by === undefined) {
    sort_by = "created_at";
  }
  if (order === undefined) {
    order = "desc";
  }
  if (
    sort_by !== "article_id" &&
    sort_by !== "title" &&
    sort_by !== "body" &&
    sort_by !== "votes" &&
    sort_by !== "author" &&
    sort_by !== "created_at" &&
    sort_by !== "comment_count"
  ) {
    sort_by = "created_at";
  }
  if (order !== "asc" && order !== "desc") {
    order = "desc";
  }
  return connection
    .select("articles.*")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id")
    .count({ comment_count: "comment_id" })
    .orderBy(sort_by, order)
    .returning("*")
    .modify(query => {
      if (author) query.where("articles.author", author);
      if (topic) query.where("articles.topic", topic);
    });
};
