import { gql } from "apollo-server";

export const typeDef = gql`
  scalar Upload
  scalar ctx

  extend type Query {
    getAllFiles: [File]
  }

  extend type Mutation {
    uploadFile(file: Upload!, ctx: ctx!): File
  }

  type File {
    id: ID!
    type: String!
    filename: String!
    mimeType: String!
    path: String!
  }
`;
