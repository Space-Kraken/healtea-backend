import { tools } from "./../../../tools/index.js";
import { UserInputError } from "apollo-server";
import models from "../../models/index.js";
import obj from "lodash";

export const resolvers = {
  Query: {
    getAppointments: async () => {
      return await models.Appointments.find();
    },
  },
  Mutation: {
    addAppointment: async (_, { patient }, { license }) => {
      // await tools.auth.authorize(license, ["Admin", "User"]);
      const getPatient = await models.Users.findById({
        _id: patient,
      });
      if (!obj.isEmpty(getPatient)) {
        const newAppointments = await models.Appointments({
          request: Date.now(),
          patient: getPatient._id,
          status: "pending",
          files: [],
        });
        if (await newAppointments.save()) {
          await models.MedicalRecord.findOneAndUpdate(
            { patient: newAppointments.patient },
            { $push: { appointments: [newAppointments._id] } }
          );
          return newAppointments;
        }
        // if (!obj.isEmpty(getDoctor)) {
        //   // let fileList = [];
        //   // files.map((file) => {
        //   //   fileList.push(file["file"]);
        //   // });

        // }
      }
    },
    appointmentAddFile: async (_, { file, ctx }) => {
      const upload = await tools.fileHandler.uploadFile(file, ctx);
      if (!obj.isEmpty(upload)) {
        const newUpload = new models.Files({
          type: upload.type,
          filename: upload.filename,
          mimeType: upload.mimetype,
          path: upload.path,
        });
        if (await newUpload.save()) {
          await models.Appointment.findOneAndUpdate(
            { _id: ctx.id },
            { $push: { files: [newUpload._id] } }
          );
          return newUpload;
        }
      }
    },
    appointmentResolution: async (
      _,
      { id, doctor, status, modality, place, date },
      { license }
    ) => {
      // await tools.auth.authorize(license, ["Admin"]);
      const getDoctor = await models.Users.findById(doctor);
      // console.log(getDoctor);
      if (!obj.isEmpty(getDoctor)) {
        const resolution = await models.Appointments.findOneAndUpdate(
          { _id: id },
          {
            doctor: getDoctor._id,
            date,
            status,
            modality,
            place,
          }
        );
        if (!obj.isEmpty(resolution)) {
          await models.Notifications.findOneAndUpdate(
            { user: resolution.patient },
            {
              $push: {
                notifications: {
                  date: Date.now(),
                  title: "Appointment info",
                  message: "The status of your appointment has changed.",
                  type: "common",
                  target: `/Appointment/${resolution._id}`,
                },
              },
            }
          );
          return resolution;
        }
      }
      throw new UserInputError("Doctor is not found");
    },
    appointmentRemoveFile: async (_, { id, file }) => {
      // tools.fileHandler.deleteDirs(patient);
      // TODO: Make remove file method for filehandler
      console.log("remove file method");
      const appointment = await models.Appointments.findOneAndUpdate(
        { _id: id },
        { $pull: { files: file } }
      );
    },
  },
  Appointment: {
    patient: async ({ patient }) => {
      return await models.Users.findById({
        _id: patient,
      });
    },
    doctor: async ({ doctor }) => {
      return await models.Users.findById({
        _id: doctor,
      });
    },
    files: async ({ files }) => {
      return await models.Files.find({
        _id: { $in: files },
      });
    },
  },
};
