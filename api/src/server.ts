import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import './database';
import AppError from './errors/AppError';
import routes from './routes';

const app = express();
app.disable('x-powered-by');
app.use(express.json());
app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(err);
  }
  return res.status(500).json({
    status: 'fail',
    message: 'Internal server error',
  });
});

const port = process.env.SERVER_PORT || 3339;

app.listen(port, () => {
  console.log(
    `🚀️ Server initialized, running in ${process.env.NODE_ENV} mode on port ${port}`,
  );
});
