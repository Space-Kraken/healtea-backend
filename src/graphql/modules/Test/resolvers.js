import models from "./../../models/index.js";
import { tools } from "./../../../tools/index.js";
import obj from "lodash";

export const resolvers = {
  Query: {
    getAllTests: async () => {
      return await models.Tests.find();
    },
  },
  Mutation: {
    addTest: async (_, { requester, patient, type, laboratory, status }) => {
      const getRequester = await models.Users.findById({
        _id: requester,
      });
      if (!obj.isEmpty(getRequester)) {
        const getPatient = await models.Users.findById({
          _id: patient,
        });
        if (!obj.isEmpty(getPatient)) {
          const newTest = await models.Tests({
            requester: getRequester._id,
            patient: getPatient._id,
            type,
            status,
            laboratory,
            files: [],
          });
          if (await newTest.save()) {
            await models.MedicalRecord.findOneAndUpdate(
              { patient },
              { $push: { tests: [newTest._id] } }
            );
            return newTest;
          }
        }
      }
    },
    updateTest: async (_, { test, status, resoult }) => {
      await models.Tests.findByIdAndUpdate(
        { _id: test },
        {
          status,
          resoult,
        }
      );
      return await models.Tests.findById({
        _id: test,
      });
    },
    testAddFile: async (_, { file, ctx }) => {},
  },
  Test: {
    requester: async ({ requester }) => {
      return await models.Users.findById({
        _id: requester,
      });
    },
    patient: async ({ patient }) => {
      return await models.Users.findById({
        _id: patient,
      });
    },
    files: async ({ files }) => {
      return await models.Files.find({
        _id: { $in: files },
      });
    },
  },
};
