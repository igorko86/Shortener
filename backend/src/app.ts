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

const startApolloServer = async () => {
  const server = new ApolloServer({
    resolvers: [authResolvers],
    typeDefs: [authTypeDefs],
    csrfPrevention: true,
    cache: 'bounded',
    context: ({ req }) => {
      // console.log(req.cookies);
      return req;
    },
  });
  await server.start();
  const app = express();

  server.applyMiddleware({ app });
  const port = (process.env.SERVER_PORT as unknown as number) || 3333;
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
  // routes(app);
  app.use(express.urlencoded({ extended: false }));
  app.use(apiErrorHandler);

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
