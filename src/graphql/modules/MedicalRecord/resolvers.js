import models from "./../../models/index.js";

export const resolvers = {
  Query: {
    getMedicalRecords: async () => {
      return await models.MedicalRecord.find();
    },
  },
  MedicalRecord: {
    patient: async ({ patient }) => {
      return await models.Users.findById({ _id: patient });
    },
    appointments: async ({ appointments }) => {
      return await models.Appointments.find({
        _id: { $in: appointments },
      });
    },
    surveys: async ({ surveys }) => {
      return await models.Surveys.find({
        _id: { $in: surveys },
      });
    },
    recipes: async ({ recipes }) => {
      return await models.Recipes.find({
        _id: { $in: recipes },
      });
    },
    tests: async ({ tests }) => {
      return await models.Tests.find({
        _id: { $in: tests },
      });
    },
  },
};
