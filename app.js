const express = require("express");
const cors = require("cors");
const app = express();
const apiRouter = require("./routers/api-router");
const { handleCustomErrors } = require("./errors/error-handling");

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

app.route("/*").get((req, res, next) => {
  res.status(404).send({ msg: "Route not found." });
});

app.route("/*").all((req, res, next) => {
  console.log("this");
  res.status(405).send({ msg: "Method denied." });
});

app.use((err, req, res, next) => {
  const errorCodes = ["22P02", "23503"];
  // console.log(err);
  if (err.status === 404) {
    res.status(404).send({ msg: "Not found." });
  }
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

app.use(handleCustomErrors);

module.exports = app;
