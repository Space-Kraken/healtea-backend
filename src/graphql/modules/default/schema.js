/*
 * This file defines the base schema
 * of the Api. Defining the data type
 * for queries (Query) and
 * mutations (Mutation).
 */

//? Import section
import { gql } from "apollo-server"; //? Get gql tag from apollo-server

export const typeDef = gql`
  scalar Date

  type Query {
    greet: String!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    greetPerson(name: String!): String!
  }

  type Auth {
    found: Boolean!
    authenticated: Boolean!
    user: User
  }
`;
