import { ApolloServer, gql } from "apollo-server-express";
import express from "express";

const schema = gql`
  type Query {
    me: User
  }

  type User {
    username: String!
  }
`;
const resolvers = {
  Query: {
    me: () => {
      return {
        username: "Milad Shirian",
      };
    },
  },
};

const app = express();
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});
await server.start()
server.applyMiddleware({ app, path: "/graphql" });



