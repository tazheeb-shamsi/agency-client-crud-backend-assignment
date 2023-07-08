import jwt from "jsonwebtoken";
import {config} from "dotenv";

config({ path: "./config/config.env" });

// Authentication middleware
export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: "Invalid token" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  } else {
    res.status(401).json({ error: "Authentication token missing" });
  }
};
