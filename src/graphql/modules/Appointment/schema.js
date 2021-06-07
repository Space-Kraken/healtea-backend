import { gql } from "apollo-server";

export const typeDef = gql`
  extend type Query {
    getAppointments: [Appointment]
  }

  extend type Mutation {
    addAppointment(patient: String!): Appointment
    appointmentAddFile(file: Upload!, ctx: ctx!): Appointment
    appointmentRemoveFile(id: String!, file: String!): Appointment
    appointmentResolution(
      id: String!
      doctor: String!
      status: String!
      modality: String!
      place: String!
      date: Date!
    ): Appointment
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
