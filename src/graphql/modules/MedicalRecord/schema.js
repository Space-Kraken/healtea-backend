import { gql } from "apollo-server";

export const typeDef = gql`
  extend type Query {
    getMedicalRecords: [MedicalRecord]
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
`;
