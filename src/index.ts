import { ApolloServer } from 'apollo-server-express';
// tslint:disable-next-line
import { graphqlExpress } from 'apollo-server-express/dist/expressApollo';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as session from 'express-session';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { schema } from './schema/schema';

const SESSION_SECRET = 'zzubdnaebeohp';

const startServer = async () => {
  const server = new ApolloServer({
    context: ({ req }: any) => ({ req }),
    schema,
  });

  await createConnection();

  const app = express();

  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:3000',
    }),
  );

  app.use(
    session({
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: process.env.NODE_ENV === 'production',
      },
      name: 'qid',
      resave: false,
      saveUninitialized: false,
      secret: SESSION_SECRET,
    }),
  );

  app.use(
    '/graphql',
    bodyParser.json(),
    (_, __, next) => {
      return next();
    },
    graphqlExpress(req => ({
      context: { req },
      schema,
    })),
  );

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });
};

startServer();
