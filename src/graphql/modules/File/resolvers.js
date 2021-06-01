import models from "./../../models/index.js";
import { tools } from "./../../../tools/index.js";
import obj from "lodash";

export const resolvers = {
  Query: {
    getAllFiles: async () => {
      return await models.Files.find();
    },
  },
  Mutation: {
    uploadFile: async (_, { file, ctx }) => {
      console.log("uploading...");
      const upload = await tools.fileHandler.uploadFile(file, ctx);
      if (!obj.isEmpty(upload)) {
        const newUpload = new models.Files({
          type: upload.type,
          filename: upload.filename,
          mimeType: upload.mimetype,
          path: upload.path,
        });
        if (await newUpload.save()) {
          return newUpload;
        }
      }
    },
  },
};
