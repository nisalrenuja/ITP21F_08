const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const dotenv = require("dotenv");
dotenv.config();

exports.protect = async (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];

  if (req.headers.authorization) {
    req.headers.authorization && req.headers.authorization.startsWith("Bearer");
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    const decoded = jwt.verify(token, "nisal");
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ErrorResponse("No user found with this id", 404));
    }

    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    return next(
      new ErrorResponse("Not authorized to access this router nisal", 401)
    );
  }
};
