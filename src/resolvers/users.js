import { GraphQLScalarType } from "graphql";
export default {
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
  Query: {
    me: (obj, args, context, info) => {
      return context.me;
    },
    user: (obj, args, { models }, info) => {
      return models.users[args.id];
    },
    users: (_, __, { models }) => {
      return Object.values(models.users);
    },
  },
  User: {
    date(obj, args, context, info) {
      return new Date(obj.date);
    },
    messages(parent, args, { models }, info) {
      return Object.values(models.messages).filter(
        (message) => parent.id === message.userId
      );
    },
  },
};
