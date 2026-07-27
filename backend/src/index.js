import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";
import { connectDB } from "./lib/db.js";

// 👇 Import app and server from socket.js
import { app, server } from "./lib/socket.js";

import clerkWebhook from "./webhooks/clerk.webhooks.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

import fs from "fs";
import path from "path";

const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

const publicDir = path.join(process.cwd(), "public");

// Clerk webhook
app.use(
  "/api/webhooks/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhook
);

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);
app.use(clerkMiddleware());

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Serve frontend
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));

  app.get("/{*any}", (req, res, next) => {
    res.sendFile(path.join(publicDir, "index.html"), (err) => next(err));
  });
}

// Start server
server.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Server is running on port ${PORT}`);
});