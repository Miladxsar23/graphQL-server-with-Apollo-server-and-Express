import { gql } from "apollo-server-express";
import userSchema from "./users.js";
import messageSchema from "./messages.js";
const linkSchema = gql`
  "The root query"
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, messageSchema];
