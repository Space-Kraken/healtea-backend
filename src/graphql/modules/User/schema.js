import { gql } from "apollo-server";

export const typeDef = gql`
  extend type Query {
    getAllUsers: [User!]
    getUser(user: String!): User
  }

  extend type Mutation {
    enrol(email: String!, password: String!, role: String!): User!
    editUser(id: String!, email: String, password: String, role: String): String
    removeUser(id: String!): String!
  }

  type User {
    id: ID!
    email: String!
    password: String!
    role: Role!
    medicalRecord: MedicalRecord!
    userData: UserData!
    notifications: [Notification]
    image: File!
  }
`;
