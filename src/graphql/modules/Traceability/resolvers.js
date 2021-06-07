import models from "./../../models/index.js";

export const resolvers = {
  Query: {
    getTraceability: async (_, { user }, { license }) => {
      //! add security layers
      return await models.Traceability.findById(user);
    },
    getAllTracers: async () => {
      //! Add security layer
      return await models.Traceability.find();
    },
  },
  Mutation: {
    startTraceability: async (_, { user, exposed }, { license }) => {
      //! Add security layer
      const traceability = await models.Traceability.findOneAndUpdate(
        { _id: user },
        {
          active: true,
          $push: {
            exposedUsers: exposed,
          },
        }
      );
      return traceability;
    },
  },
};
