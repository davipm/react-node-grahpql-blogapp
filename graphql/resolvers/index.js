import postsResolvers from "./posts";
import usersResolvers from "./users";
import commentResolver from "./comments";

const resolvers = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },

  Query: {
    ...postsResolvers.Query,
  },

  Mutation: {
    ...usersResolvers.Mutation,
    ...usersResolvers.Mutation,
    ...commentResolver.Mutation,
  },

  Subscription: {
    ...postsResolvers.Subscription,
  },
};

export default resolvers;
