export const errorHandler = (err, req, res, next) => {
  console.error(`errorHandler: ${err.stack}`);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const errorCode = err.code || "Server Error";

  res
    .status(statusCode)
    .json({ success: false, message, code: errorCode, stack: err.stack });
};
