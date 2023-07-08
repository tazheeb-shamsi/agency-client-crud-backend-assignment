import express from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import dummyUsers from "../utilities/users.js";

config({ path: "./config/config.env" });
const router = express.Router();

// Authenticate user and generate JWT token
router.post("/", (req, res) => {
  const { email, password } = req.body;

  // Find the user in dummy user data
  const user = dummyUsers.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRY,
    });
    res.status(200).json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

export default router;
