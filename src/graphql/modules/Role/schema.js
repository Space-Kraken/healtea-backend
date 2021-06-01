import { gql } from "apollo-server";

export const typeDef = gql`
  extend type Query {
    getRoles: [Role!]
  }

  extend type Mutation {
    addRole(rolType: String!): Role
  }

  type Role {
    id: ID!
    rolType: String!
  }
`;
