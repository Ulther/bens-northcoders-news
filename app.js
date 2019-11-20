const express = require("express");
const app = express();
const apiRouter = require("./routers/api-router");

app.use(express.json());

app.use("/api", apiRouter);

app.route("/*").all((req, res, next) => {
  res.status(404).send({ msg: "Route not found." });
});

app.use((err, req, res, next) => {
  const errorCodes = ["22P02"];
  if (errorCodes.includes(err.code)) {
    res.status(400).send({ msg: "Not acceptable." });
  }
  next(err);
});

app.use((err, req, res, next) => {
  // console.log("Caught error 500.");
  // console.log(err);
  res.status(500).send({ msg: "Internal Server Error!" });
});

module.exports = app;
