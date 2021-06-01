import models from "./../../models/index.js";

export const resolvers = {
  Query: {
    getModalitys: async () => {
      return await models.Modality.find();
    },
  },
  Mutation: {
    addModality: async (_, { desc }) => {
      const newModality = await models.Modality({
        desc,
      });
      if (await newModality.save()) {
        return newModality;
      }
    },
  },
};
