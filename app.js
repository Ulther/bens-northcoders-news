const express = require("express");
const app = express();
const apiRouter = require("./routers/api-router");

app.use(express.json());

app.use("/api", apiRouter);

app.route("/*").get((req, res, next) => {
  res.status(404).send({ msg: "Route not found." });
});

app.route("/*").all((req, res, next) => {
  res.status(405).send({ msg: "Method denied." });
});

app.use((err, req, res, next) => {
  const errorCodes = ["22P02", "23503"];
  if (errorCodes[0].includes(err.code)) {
    res.status(400).send({ msg: "Not acceptable." });
  }
  if (errorCodes[1].includes(err.code)) {
    res.status(422).send({ msg: "Unprocessable Entity." });
  }
  next(err);
});

app.use((err, req, res, next) => {
  // console.log("Caught error 500.");
  // console.log(err);
  res.status(500).send({ msg: "Internal Server Error!" });
});

module.exports = app;