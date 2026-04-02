const errorHandler = (error, req, res, next) => {
  if (!error.message && !error.response?.data) {
    console.error(error);
  }

  const errorStatus = error.response?.status || error.status || 500;
  const errorMessage = error.response?.data || {
    message: error.message || "Internal server error",
  };

  res.status(errorStatus).json(errorMessage);
};

module.exports = errorHandler;
