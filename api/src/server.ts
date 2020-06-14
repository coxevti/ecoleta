import express from 'express';
import 'reflect-metadata';
import routes from './routes';

const app = express();

app.use(routes);

const port = process.env.SERVER_PORT || 3339;

app.listen(port, () => {
  console.log(
    `🚀️ Server initialized, running in ${process.env.NODE_ENV} mode on port ${port}`,
  );
});
