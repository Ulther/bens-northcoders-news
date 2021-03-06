exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(404).send({ msg: "Not found." });
  } else {
    next(err);
  }
};
