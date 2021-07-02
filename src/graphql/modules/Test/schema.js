import { gql } from "apollo-server";

export const typeDef = gql`
  extend type Query {
    getAllTests: [Test!]
  }
  extend type Mutation {
    addTest(
      requester: String!
      patient: String!
      type: String!
      laboratory: String!
      status: String!
    ): Test
    updateTest(test: String!, status: String!, resoult: String!): Test!
    testAddFile(file: Upload!, ctx: ctx!): Test
  }
  type Test {
    id: ID!
    requester: User!
    patient: User!
    status: String
    type: String!
    resoult: String
    laboratory: String!
    files: [File]
  }
`;
