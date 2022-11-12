import { ApolloServer, gql } from "apollo-server-express";
import { GraphQLError, GraphQLScalarType, Kind } from "graphql";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import express from "express";

const users = {
  1: {
    id: "1",
    username: "milad shiriyan",
    date: 1666767425051,
    messageIds: [1],
  },
  2: {
    id: "2",
    username: "a.chavoshi",
    date: 1666767425028,
    messagesIds: [2],
  },
};
let messages = {
  1: {
    id: "1",
    userId: "1",
    text: "Hello world!!",
  },
  2: {
    id: "2",
    userId: "2",
    text: "By World",
  },
};
const schema = gql`
  scalar Date
  "The root query"
  type Query {
    me: User
    user(id: ID!): User
    users: [User!]
    messages: [Message!]!
    message(id: ID!): Message!
  }
  type Mutation {
    createMessage(text: String!): Message!
    deleteMessage(id: ID!): Boolean!
    updateMessage(id: ID!, text: String!): Message
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
  type Message {
    id: ID!
    text: String!
    user: User!
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
    messages(parent, args, context, info) {
      return Object.values(messages).filter(
        (message) => parent.id === message.userId
      );
    },
  },
  Message: {
    user(parent, args, context, info) {
      const { userId: id } = parent;
      return users[id];
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
    messages: () => {
      return Object.values(messages);
    },
    message: (parent, args, context, info) => {
      return messages[args.id];
    },
  },
  Mutation: {
    createMessage(parent, { text }, { me }, info) {
      const id = uuidv4();
      const message = {
        id,
        text,
        userId: me.id,
      };
      messages[id] = message;
      users[me.id].messageIds.push(id);
      return message;
    },
    deleteMessage(parent, { id }, { me }, info) {
      const { [id]: message, ...otherMessages } = messages;
      if (!message) {
        return false;
      }
      messages = otherMessages;
      users[me.id].messageIds = users[me.id].messageIds.filter(
        (messageId) => messageId === id
      );
      return true;
    },
    updateMessage(parent, { id, text }, { me }, info) {
      if (!messages[id]) return null;
      messages[id].text = text;
      return messages[id];
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
