import express from 'express';
import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';

import { connectDB } from './db/connection';
import { routes } from './routes/routes';
import { apiErrorHandler } from './middlewares/errorHandler';

const app = express();

const port = process.env.SERVER_PORT as unknown as number;
const client = process.env.CLIENT_URL;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: false,
  })
);
app.use(
  cors({
    credentials: true,
    origin: client,
  })
);
app.use(express.json());
app.use(cookieParser());
routes(app);
app.use(express.urlencoded({ extended: false }));
app.use(apiErrorHandler);

const start = () => {
  try {
    app.listen(port, () => {
      console.log('Working ...');
    });
    connectDB();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
