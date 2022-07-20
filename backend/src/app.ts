import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';

import { connectDB } from './db/connection';
import { routes } from './routes/routes';
import { apiErrorHandler } from './middlewares/errorHandler';
import { authResolvers } from './graphql/auth/resolvers';
import { authTypeDefs } from './graphql/auth/typeDefs';
import { ErrorMessage, getErrorCode } from './shared/errorHandler';

const startApolloServer = async () => {
  const server = new ApolloServer({
    resolvers: [authResolvers],
    typeDefs: [authTypeDefs],
    csrfPrevention: true,
    cache: 'bounded',
    context: (ctx) => ({ ...ctx }),
    formatError: (err) => {
      return getErrorCode(err.message as ErrorMessage) || err;
    },
  });
  const app = express();
  const port = (process.env.SERVER_PORT as unknown as number) || 3333;
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
  const corsOptions = {
    origin: [clientUrl, 'https://studio.apollographql.com'],
    credentials: true,
  };

  app.use(cookieParser());

  await server.start();
  server.applyMiddleware({ app, cors: corsOptions });
  // server.applyMiddleware({ app });

  // app.use(bodyParser.json({ limit: '50mb' }));
  // app.use(
  //   bodyParser.urlencoded({
  //     limit: '50mb',
  //     extended: false,
  //   })
  // );

  // app.use(express.json());
  // routes(app);
  // app.use(express.urlencoded({ extended: false }));
  // app.use(apiErrorHandler);

  const start = async () => {
    try {
      app.listen(port, () => {
        console.log(`Working ...${port}`);
        console.log(`server ...${server.graphqlPath}`);
      });
      connectDB();
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };

  start();
};

startApolloServer();
