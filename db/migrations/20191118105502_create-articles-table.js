exports.up = function(knex) {
  // console.log("Creating articles table.");
  return knex.schema.createTable("articles", articlesTable => {
    articlesTable.increments("article_id").primary();
    articlesTable.string("title");
    articlesTable.text("body");
    articlesTable.integer("votes").defaultTo(0);
    articlesTable.string("topic").references("topics.slug");
    articlesTable.string("author").references("users.username");
    articlesTable.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  // console.log("Dropping articles table.");
  return knex.schema.dropTable("articles");
};
