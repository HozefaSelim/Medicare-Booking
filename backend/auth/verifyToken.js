import jwt from "jsonwebtoken";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

export const authenticate = async (req, res, next) => {
  // Get token from headers
  const authToken = req.headers.authorization;

  // Check if token exists
  if (!authToken || !authToken.startsWith("Bearer")) {
    return res.status(401).json({ success: false, message: "No token, authorization denied" });
  }

  try {
    const token = authToken.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.id;
    req.role = decoded.role;
    next(); // Continue to the next middleware
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token is expired" });
    }
    return res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

export const restrict = (roles) => async (req, res, next) => {
  const userId = req.userId;
  let user = null;

  // Determine if the user is a doctor or a patient
  const patient = await User.findById(userId);
  const doctor = await Doctor.findById(userId);

  if (patient) {
    user = patient;
  } else if (doctor) {
    user = doctor;
  }

  // If user is not found, return an error
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  // Check if the user's role is in the allowed roles
  if (!roles.includes(user.role)) {
    return res.status(403).json({ success: false, message: "You are not authorized" });
  }

  // If user is authorized, move to the next middleware
  next();
};
