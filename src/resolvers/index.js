import { GraphQLScalarType } from "graphql";
import userResolver from "./users.js";
import messageResolver from "./message.js";
export default [userResolver, messageResolver];
