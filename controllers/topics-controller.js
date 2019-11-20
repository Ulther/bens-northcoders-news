const { getAllTopics } = require("../models/topics-model");

exports.sendAllTopics = (req, res, next) => {
  // console.log("Topics controller here.");
  getAllTopics()
    .then(topics => {
      res.status(200).send({ topics });
    })
    .catch(next);
};
