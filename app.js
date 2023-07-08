import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";

import agencyRoutes from "./routes/agencyRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import topClientRoute from "./routes/topClientRoute.js";
import authRoutes from "./routes/authRoutes.js";
import bodyParser from "body-parser";

config({ path: "./config/config.env" });

export const app = express();
app.use(bodyParser.json());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully, Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });

// handling auth middleware
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "Invalid token" });
  } else {
    res.status(500).json({ error: "Internal server error" });
  }
});

//  API routes
app.use("/api/login", authRoutes);
app.use("/api/agency", agencyRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/topClient", topClientRoute);
