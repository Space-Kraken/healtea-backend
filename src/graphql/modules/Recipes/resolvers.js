import models from "./../../models/index.js";
import { tools } from "./../../../tools/index.js";
import obj from "lodash";

export const resolvers = {
  Query: {
    getAllrecipes: async () => {
      return await models.Recipes.find();
    },
  },
  Mutation: {
    addRecipe: async (_, { patient, doctor, treatment }) => {
      const getPatient = await models.Users.findById({
        _id: patient,
      });
      if (!obj.isEmpty(getPatient)) {
        const getDoctor = await models.Users.findById({
          _id: doctor,
        });
        if (!obj.isEmpty(getDoctor)) {
          const newRecipes = await models.Recipes({
            patient: getPatient._id,
            doctor: getDoctor._id,
            date: Date.now(),
            treatment: treatment,
            files: [],
          });
          if (await newRecipes.save()) {
            await models.MedicalRecord.findOneAndUpdate(
              { patient: newRecipes.patient },
              { $push: { recipes: [newRecipes._id] } }
            );
            return newRecipes;
          }
        }
      }
    },
    recipeAddFile: async (_, { file, ctx }) => {
      const upload = await tools.fileHandler.uploadFile(file, ctx);
      if (!obj.isEmpty(upload)) {
        const newUpload = new models.Files({
          type: upload.type,
          filename: upload.filename,
          mimeType: upload.mimetype,
          path: upload.path,
        });
        if (await newUpload.save()) {
          await models.Recipes.findOneAndUpdate(
            { _id: ctx.id },
            { $push: { files: [newUpload._id] } }
          );
          return newUpload;
        }
      }
    },
  },
};
