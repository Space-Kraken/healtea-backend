import models from "./../../models/index.js";

export const resolvers = {
  Query: {
    getSurveys: async () => {
      return await models.Surveys.find();
    },
  },
  Mutation: {
    addSurvey: async (_, { patient, modality }) => {
      const newSurvey = await models.Surveys({
        patient,
        modality,
        other: "",
        answers: "0000000000",
        completed: false,
      });
      if (await newSurvey.save()) {
        if (
          await models.MedicalRecord.findOneAndUpdate(
            { patient },
            { $push: { surveys: [newSurvey._id] } }
          )
        ) {
          return newSurvey;
        }
      }
    },
    finishSurvey: async (_, { survey, answers, other }) => {
      await models.Surveys.findByIdAndUpdate(
        { _id: survey },
        {
          answers,
          other,
          date: Date.now(),
          completed: true,
        }
      );
      return await models.Surveys.findById({
        _id: survey,
      });
    },
  },
  Survey: {
    patient: async ({ patient }) => {
      return await models.Users.findById({
        _id: patient,
      });
    },
    modality: async ({ modality }) => {
      return models.Modality.findById({
        _id: modality,
      });
    },
  },
};
