import { v4 as uuidv4 } from "uuid";
export default {
  Query: {
    messages: (_, __, { models }) => {
      return Object.values(models.messages);
    },
    message: (parent, args, { models }, info) => {
      return models.messages[args.id];
    },
  },
  Message: {
    user(parent, args, { models }, info) {
      const { userId: id } = parent;
      return models.users[id];
    },
  },
  Mutation: {
    createMessage(parent, { text }, { me, models }, info) {
      const id = uuidv4();
      const message = {
        id,
        text,
        userId: me.id,
      };
      models.messages[id] = message;
      models.users[me.id].messageIds.push(id);
      return message;
    },
    deleteMessage(parent, { id }, { me, models }, info) {
      const { [id]: message, ...otherMessages } = models.messages;
      if (!message) {
        return false;
      }
      messages = otherMessages;
      models.users[me.id].messageIds = models.users[me.id].messageIds.filter(
        (messageId) => messageId === id
      );
      return true;
    },
    updateMessage(parent, { id, text }, { me, models }, info) {
      if (!models.messages[id]) return null;
      models.messages[id].text = text;
      return models.messages[id];
    },
  },
};
