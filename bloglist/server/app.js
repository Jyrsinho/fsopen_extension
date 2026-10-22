const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const blogsRouter = require("./controllers/blogs");
const loginRouter = require("./controllers/login");
const { requestLogger, tokenExtractor } = require("./utils/middleware");
const usersRouter = require("./controllers/users");
const testingRouter = require("./controllers/testing");
const path = require("node:path");

const app = express();
logger.info("Connecting to DB...");

mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

app.use(express.json());
app.use(tokenExtractor);

app.get("/api/ping", (req, res) => {
  res.json({ message: "pong", time: new Date().toISOString() });
});
app.use("/api/blogs", middleware.userExtractor, blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "development") {
  app.use(requestLogger);
  app.use("/api/testing", testingRouter);
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("/*splat", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
