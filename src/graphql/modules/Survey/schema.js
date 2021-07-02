import { gql } from "apollo-server";

export const typeDef = gql`
  extend type Query {
    getSurveys: [Survey]
  }

  extend type Mutation {
    addSurvey(patient: String!, modality: String!): Survey
    finishSurvey(survey: String!, answers: String!, other: String!): Survey
  }

  type Survey {
    id: ID!
    patient: User!
    date: Date
    answers: String
    modality: String!
    other: String
    completed: Boolean!
  }
`;
