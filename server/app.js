const path = require('path');
const express = require('express');
const morgan = require('morgan');
const AppError = require('./appError');
const voteRouter = require('./routes/voteRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();
const cors = require('cors');
// GLOBAL MIDDLEWARES

// Serving static files
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Parse JSON bodies (as sent by API clients)
// const bodyParser = require('body-parser');
app.use(cors());
app.use(express.json());

// Access the parse results as request.body
// ROUTES
app.use('/api/v1/votes', voteRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
