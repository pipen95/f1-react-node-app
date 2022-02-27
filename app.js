const express = require('express');
const morgan = require('morgan');
// const cors = require('cors');
const cookieParser = require('cookie-parser');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const voteRouter = require('./routes/voteRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// GLOBAL MIDDLEWARES

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  console.log(req.headers);
  next();
});

// Parse JSON bodies and cookies (as sent by API clients)
app.use(cookieParser());
app.use(express.json());
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
//     allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
//   })
// );

// Access the parse results as request.body
// ROUTES
app.use('/api/v1/votes', voteRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
