const connection = require("../connection");

exports.getAllUsers = () => {
  // console.log("Users model here.");
  return connection
    .select("*")
    .from("users")
    .returning("*");
};

exports.getUserById = username => {
  // console.log("Users model here.");
  return connection
    .select("*")
    .from("users")
    .where({ username: username })
    .first();
};
