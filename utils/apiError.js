class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "Failed" : "Error";
    Error.captureStackTrace(this, this.constructor);
  }
}

new ApiError();

module.exports = ApiError;
