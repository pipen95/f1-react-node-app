const path = require("path");
const express = require("express");
const morgan = require("morgan");
const AppError = require("./appError");
const voteRouter = require("./routes/voteRoutes");

const app = express();

// GLOBAL MIDDLEWARES

// Serving static files
app.use(express.static(path.resolve(__dirname, "../client/build")));

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Access the parse results as request.body
// ROUTES
app.use("/ap1/v1/votes", voteRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
