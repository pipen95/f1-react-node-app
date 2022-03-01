const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin:'http://localhost:3001',
    credentials: true,
    headers:['Content-Length','Content-Type','Authorization'],
  })
);

// allow the app to use cookieparser
app.use(helmet());

app.use(cookieParser());

// Access the parse results as request.body
// ROUTES
app.use('/api/votes', voteRouter);
app.use('/api/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
