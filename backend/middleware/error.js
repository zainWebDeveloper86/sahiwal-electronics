// import ErrorHandler from "../utils/ErrorHandler.js";

// export default (err, req, res, next) => {
//   err.statusCode = err.statusCode || 500;
//   err.message = err.message || "Internal server Error";

//   // Wrong MongoDB ID (CastError)
//   if (err.name === "CastError") {
//     const message = `Resources not found with this id.. Invalid ${err.path}`;
//     err = new ErrorHandler(message, 400);
//   }

//   // Duplicate Key Error (MongoDB 11000)
//   if (err.code === 11000) {
//     const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`;
//     err = new ErrorHandler(message, 400);
//   }

//   // Wrong JWT Error
//   if (err.name === "JsonWebTokenError") {
//     const message = `Your url is invalid please try again later`;
//     err = new ErrorHandler(message, 400);
//   }

//   // JWT Expired Error
//   if (err.name === "TokenExpiredError") {
//     const message = `Your Url is expired please try again later!`;
//     err = new ErrorHandler(message, 400);
//   }

//   // Mongoose Validation Error
//   if (err.name === "ValidationError") {
//     const message = Object.values(err.errors)
//       .map((val) => val.message)
//       .join(". ");
//     err = new ErrorHandler(message, 400);
//   }

//   // Mongoose Schema Validation Error (min/max, required etc.)
//   if (err.name === "ValidatorError") {
//     const message = err.message;
//     err = new ErrorHandler(message, 400);
//   }

//   // Mongoose Cast Error
//   if (err.name === "CastError" && err.kind === "Number") {
//     const message = `Invalid ${err.path}: ${err.value} is not a valid number.`;
//     err = new ErrorHandler(message, 400);
//   }

//   // Mongoose Strict Mode Error )
//   if (err.name === "StrictModeError") {
//     const message = `Field "${err.field}" is not allowed in schema.`;
//     err = new ErrorHandler(message, 400);
//   }

//   // Mongoose ParallelSaveError 
//   if (err.name === "ParallelSaveError") {
//     const message = "Same document is being saved multiple times. Please wait.";
//     err = new ErrorHandler(message, 409);
//   }

//   // Send Clean Response
//   res.status(err.statusCode).json({
//     success: false,
//     message: err.message,
//   });
// };


import ErrorHandler from "../utils/ErrorHandler.js";

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server Error";

  // wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resources not found with this id.. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  // wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `Your url is invalid please try again letter`;
    err = new ErrorHandler(message, 400);
  }

  // jwt expired
  if (err.name === "TokenExpiredError") {
    const message = `Your Url is expired please try again letter!`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};