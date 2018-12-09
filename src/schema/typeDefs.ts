import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    currentUser: User
    users: [User]
    userProfiles: [UserProfile]
  }
  type Mutation {
    register(
      email: String!
      password: String!
      firstName: String!
      lastName: String!
      username: String!
    ): Boolean!
    login(email: String!, password: String!): Boolean!
  }
  type User {
    id: ID!
    email: String!
    password: String!
    userProfile: UserProfile!
  }
  type UserProfile {
    id: ID!
    username: String!
    firstName: String!
    lastName: String!
    emailConfirmed: Boolean!
  }
`;
