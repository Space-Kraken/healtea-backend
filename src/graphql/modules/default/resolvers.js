import { tools } from "./../../../tools/index.js";
import models from "./../../models/index.js";

export const resolvers = {
  Query: {
    greet: () => "Hello world",
  },
  Mutation: {
    greetPerson(_, { name }) {
      return `Hello ${name}`;
    },
    login: async (_, { email, password }) => {
      const { found, authenticated, user } = await tools.auth.authenticate(
        email,
        password
      );
      if (found && authenticated) {
        await models.Users.findOneAndUpdate(
          { email },
          { token: tools.encryptor.generateToken(user._id) }
        );
        return {
          found,
          authenticated,
          user: user._id,
        };
      }
      return {
        found,
        authenticated,
      };
    },
  },
};
