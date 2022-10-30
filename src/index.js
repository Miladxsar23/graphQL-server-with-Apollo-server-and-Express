import { ApolloServer, gql } from "apollo-server-express";
import { GraphQLError, GraphQLScalarType, Kind } from "graphql";
import cors from "cors";
import express from "express";

const users = {
  1: {
    id: "1",
    username: "milad shiriyan",
    date: 1666767425051,
  },
  2: {
    id: "2",
    username: "a.chavoshi",
    date: 1666767425028,
  },
};
const schema = gql`
  scalar Date
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
    date: Date
  }
`;
let resolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "a custom scalar type",
    serialize(value) {
      if (value instanceof Date) {
        return value.getTime();
      }
      throw new GraphQLError("Provided value is not a Date instance", {
        extensions: { code: "BAD_USER_INPUT" },
      });
    },
    parseValue(value) {
      if (typeof value === "number" && Number.isInteger(value)) {
        return new Date(value);
      }
      throw new GraphQLError("Provided value is not Date integer", {
        extensions: { code: "BAD_USER_INPUT" },
      });
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(parseInt(ast.value, 10));
      }
      return null;
    },
  }),
  User: {
    date(obj, args, context, info) {
      return new Date(obj.date);
    },
  },
  Query: {
    me: (obj, args, context, info) => {
      return context.me;
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
    context: {
      me: users[1],
    },
  });
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
  app.listen({ port: 8000 }, () => {
    console.log("server run at http://localhost:8000/graphql");
  });
}

startApolloServer();
