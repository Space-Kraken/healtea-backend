import { gql } from "apollo-server";

export const typeDef = gql`
  extend type Query {
    getAllrecipes: [Recipe!]
  }
  extend type Mutation {
    addRecipe(patient: String, doctor: String!, treatment: String!): Recipe
    recipeAddFile(file: Upload!, ctx: ctx!): Recipe
  }
  type Recipe {
    id: ID!
    patient: User!
    doctor: User!
    date: Date!
    treatment: String!
    files: [File]
  }
`;
