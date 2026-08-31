import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sendEmailHandler from "./api/send-email.js";

dotenv.config();

const app = express();

// Allow requests from all networks and devices
app.use(cors());
app.use(express.json());

// Main Email API Route
app.post("/api/send-email", (req, res) => {
  sendEmailHandler(req, res);
});

const PORT = process.env.PORT || 5000;

// '0.0.0.0' binds server to all network interfaces (Localhost + Mobile Wi-Fi IP)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend server globally active on port ${PORT}`);
});