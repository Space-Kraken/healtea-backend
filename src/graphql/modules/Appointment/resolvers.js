import models from "../../models/index.js";
import { tools } from "./../../../tools/index.js";
import obj from "lodash";

export const resolvers = {
  Query: {
    getAppointments: async () => {
      return await models.Appointments.find();
    },
  },
  Mutation: {
    addAppointment: async (_, { patient, doctor }, { license }) => {
      await tools.auth.authorize(license, ["Admin"]);
      const getPatient = await models.Users.findById({
        _id: patient,
      });
      if (!obj.isEmpty(getPatient)) {
        const getDoctor = await models.Users.findById({
          _id: doctor,
        });
        if (!obj.isEmpty(getDoctor)) {
          // let fileList = [];
          // files.map((file) => {
          //   fileList.push(file["file"]);
          // });
          const newAppointments = await models.Appointments({
            request: Date.now(),
            patient: getPatient._id,
            doctor: getDoctor._id,
            files: [],
          });
          if (await newAppointments.save()) {
            await models.MedicalRecord.findOneAndUpdate(
              { patient: newAppointments.patient },
              { $push: { appointments: [newAppointments._id] } }
            );
            return newAppointments;
          }
        }
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
