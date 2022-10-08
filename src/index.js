import { ApolloServer, gql } from "apollo-server-express";
import cors from "cors";
import express from "express";

const schema = gql`
  type Query {
    me: User
  }
  type User {
    username: String!
    age: Int
  }
`;
let resolvers = {
  Query: {
    me() {
      return { username: "Milad Shirian", age: 29 };
    },
  },
};

async function startApolloServer() {
  const app = express();
  app.use(cors());
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
  });
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
  app.listen({ port: 8000 }, () => {
    console.log("server run at http://localhost:8000/graphql");
  });
}

startApolloServer().then();
