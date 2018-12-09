import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

export const schema = makeExecutableSchema({
  resolvers: merge(resolvers),
  typeDefs: [typeDefs],
});
