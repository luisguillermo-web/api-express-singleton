import gql from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: Int!
    name: String!
  }

  type Query {
    user(id: Int!): User
  }
`;