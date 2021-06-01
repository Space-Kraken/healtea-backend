import { AuthenticationError, ForbiddenError } from "apollo-server";
import models from "./../../graphql/models/index.js";
import { encryptor } from "./Encryption.js";
import _ from "lodash";

export const auth = {
  authorize: async (license, credentials) => {
    if (!license)
      throw new AuthenticationError("You must be logged in for use this query");
    const { rolType } = (await models.Roles.findById(license)) || [];

    if (!rolType || !credentials.includes(rolType))
      throw new ForbiddenError(
        "invalid credentials: You are not allowed to use this query"
      );
  },
  authenticate: async (email, password) => {
    const user = await models.Users.findOne({ email: email });
    if (user) {
      const userPSW = encryptor.decrypt(user.password);
      if (userPSW == password) {
        return {
          found: true,
          authenticated: true,
          user,
        };
      }
      return {
        found: true,
        authenticated: false,
      };
    }
    return {
      found: false,
      authenticated: false,
    };
  },
  setToken: () => {
    const token = "123";
    return token;
  },
  getLicense: async (token) => {
    const user = await models.Users.findOne({
      token,
    });
    if (user) {
      if (await models.Roles.findById({ _id: user.role })) return user.role;
    }
    return user;
  },
};
