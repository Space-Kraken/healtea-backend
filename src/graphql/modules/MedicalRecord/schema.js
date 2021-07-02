import { gql } from "apollo-server";

export const typeDef = gql`
  extend type Query {
    getMedicalRecords: [MedicalRecord]
    getStatistics: Statistics
  }

  extend type Mutation {
    updateStatus(id: String!, status: String!): MedicalRecord
  }

  type MedicalRecord {
    id: ID!
    patient: User!
    status: String!
    appointments: [Appointment]
    surveys: [Survey]
    recipes: [Recipe]
    tests: [Test]
  }

  type Statistics {
    infections: infectionTracking
  }

  type infectionTracking {
    healty: String!
    infected: String!
    uknow: String!
  }
`;
