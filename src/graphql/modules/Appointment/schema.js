import { gql } from "apollo-server";

export const typeDef = gql`
  extend type Query {
    getAppointments: [Appointment]
  }

  extend type Mutation {
    addAppointment(patient: String!, doctor: String!): Appointment
    appointmentAddFile(file: Upload!, ctx: ctx!): Appointment
    appointmentRemoveFile(id: String!, file: String!): Appointment
  }

  type Appointment {
    id: ID!
    request: Date!
    patient: User!
    doctor: User!
    date: Date
    status: String!
    modality: String!
    place: String!
    files: [File]
  }
`;
