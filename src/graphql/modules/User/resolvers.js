import { tools } from "./../../../tools/index.js";
import models from "./../../models/index.js";
import _ from "lodash";

export const resolvers = {
  Query: {
    getAllUsers: async (_parent, _args, { license }) => {
      await tools.auth.authorize(license, ["Admin"]);
      return await models.Users.find();
    },
    getUser: async (_parent, { user }, { license }) => {
      await tools.auth.authorize(license, "Admin");
      return await models.Users.findById({ _id: user });
    },
  },
  Mutation: {
    enrol: async (_, { email, password, role }, { license }) => {
      await tools.auth.authorize(license, "Admin");

      password = tools.encryptor.encrypt(password);

      const newUser = new models.Users({
        email,
        password,
        role,
        token: "NA",
        image: "60b134907ac52b2ba8055dfc",
      });
      if (await newUser.save()) {
        tools.fileHandler.createDirs(newUser._id);
        const newUserData = new models.UserData({
          _id: newUser._id,
          name: "NA",
          age: "NA",
          gender: "NA",
          address: {
            state: "NA",
            city: "NA",
            street: "NA",
            postalCode: "NA",
          },
          tel: "NA",
        });
        if (await newUserData.save()) {
          const newMedicalRecord = new models.MedicalRecord({
            patient: newUser._id,
            status: "Uknow",
            appointments: [],
            surveys: [],
            recipes: [],
            tests: [],
          });
          if (await newMedicalRecord.save()) {
            return newUser;
          }
        }
      }
    },
    editUser: async (_, { id, email, password, role }, { license }) => {
      await tools.auth.authorize(license, "Admin");
      password = password ? tools.encryptor.encrypt(password) : password;
      const user = await models.Users.findOne({ _id: id });
      if (user) {
        await models.Users.findByIdAndUpdate(
          { _id: id },
          {
            email: email ? email : user.email,
            password: password ? password : user.password,
            role: role ? role : user.role,
          }
        );
        return "User updated successfully";
      }
      return "User not found";
    },
    removeUser: async (_, { id }, { license }) => {
      await tools.auth.authorize(license, "Admin");
      const user = await models.Users.find({ _id: id });
      if (!_.isEmpty(user)) {
        return "This user exist";
      }
      return "This user does not exist";
    },
  },
  User: {
    role: async ({ role }) => {
      return await models.Roles.findOne({ _id: role });
    },
    userData: async ({ _id }) => {
      return await models.UserData.findById(_id);
    },
    medicalRecord: async ({ _id }) => {
      return await models.MedicalRecord.findOne({ patient: _id });
    },
    image: async ({ image }) => {
      return await models.Files.findOne({ _id: image });
    },
  },
  Auth: {
    user: async ({ user }) => {
      return await models.Users.findOne({
        _id: user,
      });
    },
  },
};
