const connection = require("../connection");

exports.getAllTopics = () => {
  // console.log("Topics model here.");
  return connection
    .select("*")
    .from("topics")
    .returning("*");
};
