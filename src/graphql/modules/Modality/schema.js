import { gql } from "apollo-server";

export const typeDef = gql`
  extend type Query {
    getModalitys: [Modality!]
  }

  extend type Mutation {
    addModality(desc: String!): Modality
  }

  type Modality {
    id: ID!
    desc: String!
  }
`;
