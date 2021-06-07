import { tools } from "./../../../tools/index.js";
import models from "./../../models/index.js";

export const resolvers = {
  Query: {
    getAllNotifications: async (_parent, _args, { license }) => {
      await tools.auth.authorize(license, ["Admin"]);
      return await models.Notifications.find();
    },
    getNotifications: async (_parent, { user }, { license }) => {
      await tools.auth.authorize(license, ["Admin"]);
      return await models.Notifications.findById(user);
    },
  },
  Mutation: {
    newNotifiaction: async (_, { user, notification }, { license }) => {
      await tools.auth.authorize(license, ["Admin"]);
      const newNotification = await models.Notifications.findByIdAndUpdate(
        { _id: user },
        {
          data: Date.now(),
          title: notification.title,
          message: notification.message,
          target: notification.target,
        }
      );
    },
  },
};
