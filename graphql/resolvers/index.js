import postsResolvers from "./posts";
import usersResolvers from "./users";

const resolvers = {
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
  },
};

export default resolvers;
