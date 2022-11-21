import { defaultTypeResolver } from "graphql";

// data access layer -> sample data | database loader | third party api
let users = {
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

export default {
    users, messages
}