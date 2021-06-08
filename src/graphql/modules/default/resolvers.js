import { tools } from "./../../../tools/index.js";
import models from "./../../models/index.js";

export const resolvers = {
  Query: {
    greet: () => "Hello world",
    login: async (_, { email, password }) => {
      const { found, authenticated, user } = await tools.auth.authenticate(
        email,
        password
      );
      if (found && authenticated) {
        return {
          found,
          authenticated,
          user,
          token: tools.auth.setToken(user._id),
        };
      }
      return {
        found,
        authenticated,
      };
    },
  },
  Mutation: {
    greetPerson(_, { name }) {
      return `Hello ${name}`;
    },
  },
};
