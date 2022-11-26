import { ApolloServer, gql } from "apollo-server-express";
import { GraphQLError, GraphQLScalarType, Kind } from "graphql";
import { v4 as uuidv4 } from "uuid";
import schema from "./schema/index.js";
import resolvers from "./resolvers/index.js";
import models from "./models/index.js";
import cors from "cors";
import express from "express";
async function startApolloServer() {
  const app = express();
  app.use(cors());
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: async () => {
      console.log(
        "i am inside the context and i wanna show you that i'll run during every request, just look at the console :)"
      );
      return {
        models,
        me: models.users[1],
      };
    },
  });
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
  app.listen({ port: 8000 }, () => {
    console.log("server run at http://localhost:8000/graphql");
  });
}

startApolloServer();
