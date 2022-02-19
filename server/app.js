const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const voteRouter = require('./routes/voteRoutes');
const userRouter = require('./routes/userRoutes');
const authController = require('./controllers/authController');

const app = express();

// GLOBAL MIDDLEWARES

// Serving static files
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// app.use((req, res, next) => {
//   console.log(req.headers);
//   next();
// });

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

app.use(globalErrorHandler);

module.exports = app;
