import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, token failed",
    });
  }
};

export const isCandidate = (req, res, next) => {
  if (req.user && req.user.role === "candidate") {
    return next();
  }
  return res.status(403).json({
    success: false,
    message: "Access denied: Candidates only",
  });
};

export const isRecruiter = (req, res, next) => {
  if (req.user && req.user.role === "recruiter") {
    return next();
  }
  return res.status(403).json({
    success: false,
    message: "Access denied: Recruiters only",
  });
};
