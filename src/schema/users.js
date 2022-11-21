import { gql } from "apollo-server-express";
export default gql`
  extend type Query {
    me: User!
    user(id: ID!): User
    users: [User!]
  }
  "Description for the User"
  type User {
    """
    id is unique
    """
    id: ID!
    username: String!
    date: Date
    messages: [Message!]
  }
`;
