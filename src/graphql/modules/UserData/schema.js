import { gql } from "apollo-server";

export const typeDef = gql`
  extend type Mutation {
    editData(
      user: String!
      name: String
      age: String
      gender: String
      address: AddressInput
      tel: String
    ): User
  }

  type UserData {
    id: ID!
    name: String!
    age: String!
    gender: String!
    address: Address!
    tel: String!
  }

  type Address {
    state: String!
    city: String!
    street: String!
    postalCode: String!
  }

  input AddressInput {
    state: String
    city: String
    street: String
    postalCode: String
  }
`;
