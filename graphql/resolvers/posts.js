import { AuthenticationError, UserInputError } from "apollo-server";
import Post from "../../models/Post";
import checkAuth from "../../util/check-auth";

const postsResolvers = {
  Query: {
    async getPosts() {
      try {
        return await Post.find();
      } catch (err) {
        throw new Error(err);
      }
    },

    async getPost(_, { postId }) {
      //
    },
  },

  Mutation: {},
};

export default postsResolvers;
