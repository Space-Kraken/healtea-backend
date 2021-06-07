import { gql } from "apollo-server";

export const typeDef = gql`
  extend type Query {
    getAllNotifications: Notification
    getNotifications(user: String!): [Notification]
  }

  extend type Mutation {
    newNotifiaction(user: String!, notification: NotiInput): Notification
  }

  type Notification {
    user: String!
    notifications: [Notifications]
  }

  type Notifications {
    data: Date!
    title: String!
    message: String!
    target: String!
  }

  input NotiInput {
    title: String!
    message: String!
    target: String!
  }
`;
