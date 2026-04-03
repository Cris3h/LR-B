module.exports = (res, statusCode, data, error = false) => {
   res.status(statusCode).json({
      error,
      data
   });
};