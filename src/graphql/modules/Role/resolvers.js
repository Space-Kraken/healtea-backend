import models from "../../models/index.js";

export const resolvers = {
  Query: {
    getRoles: async () => {
      return await models.Roles.find();
    },
  },
  Mutation: {
    addRole: async (_, { rolType }) => {
      const newRole = new models.Roles({
        rolType,
      });
      if (await newRole.save()) {
        return newRole;
      }
    },
  },
};
