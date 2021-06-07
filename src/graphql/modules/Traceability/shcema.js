import { gql } from "apollo-server";

export const typeDef = gql`
  scalar Exposed

  extend type Query {
    getTraceability(user: String!): Traceability
    getAllTracers: [Traceability]
  }

  extend type Mutation {
    startTraceability(user: String!, exposed: Exposed!): Traceability
  }

  type Traceability {
    user: User!
    exposedUsers: [User]
    active: Boolean!
  }
`;
