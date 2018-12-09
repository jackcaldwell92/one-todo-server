import * as argon from 'argon2';
import { IResolvers } from 'graphql-tools';
import { User } from '../entity/User';
import { UserProfile } from './../entity/UserProfile';

export const resolvers: IResolvers = {
  Mutation: {
    login: async (_, { email, password }, { req }) => {
      const user = await User.findOne({ email });
      if (!user) {
        return false;
      }
      const valid = await argon.verify(user.password, password);
      if (!valid) {
        return false;
      }
      req.session.userId = user.id;
      console.log(req.session.userId);
      return true;
    },
    register: async (
      _,
      { email, password, firstName, lastName, username },
      { req },
    ) => {
      const hashedPassword = await argon.hash(password);
      const user = User.create({
        email,
        password: hashedPassword,
        userProfile: await UserProfile.create({
          firstName,
          lastName,
          username,
        }).save(),
      });
      await user.save();
      req.session.userId = user.id;
      return true;
    },
  },
  Query: {
    currentUser: async (_, __, { req }) => {
      console.log('getting current user');
      console.log(req.session.userId);
      if (!req.session.userId) {
        return null;
      }
      const user = await User.findOne(req.session.userId, {
        relations: ['userProfile'],
      });
      return user;
    },
    userProfiles: () => {
      return UserProfile.find();
    },
    users: () => {
      return User.find({ relations: ['userProfile'] });
    },
  },
};
