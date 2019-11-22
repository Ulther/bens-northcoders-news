exports.up = function(knex) {
  // console.log("Creating comments table.");
  return knex.schema.createTable("comments", commentsTable => {
    commentsTable.increments("comment_id").primary();
    commentsTable.string("author").references("users.username");
    commentsTable
      .integer("article_id")
      .references("articles.article_id")
    commentsTable.integer("votes").defaultTo(0);
    commentsTable.timestamp("created_at");
    commentsTable.text("body");
  });
};

exports.down = function(knex) {
  // console.log("Dropping comments table.");
  return knex.schema.dropTable("comments");
};
