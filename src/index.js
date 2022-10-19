import { ApolloServer, gql } from "apollo-server-express";
import cors from "cors";
import express from "express";

const users = {
  1: {
    id: "1",
    username: "milad shiriyan",
  },
  2: {
    id: "2",
    username: "a.chavoshi",
  },
};
const me = users[1];
const schema = gql`
"The root query"
  type Query {
    me: User
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
  }
`;
let resolvers = {
  Query: {
    me: () => {
      return me;
    },
    user: (obj, args, context, info) => {
      return users[args.id];
    },
    users: () => {
      return Object.values(users);
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

startApolloServer();
