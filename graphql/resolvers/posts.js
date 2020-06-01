import { AuthenticationError, UserInputError } from "apollo-server";
import Post from "../../models/Post";
import checkAuth from "../../util/check-auth";

const postsResolvers = {
  Query: {
    /**
     *
     * @returns {Promise<*>}
     */
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },

    /**
     *
     * @param _
     * @param postId
     * @returns {Promise<*>}
     */
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Mutation: {
    /**
     *
     * @param _
     * @param body
     * @param context
     * @returns {Promise<any>}
     */
    async createPost(_, { body }, context) {
      const user = checkAuth(context);

      if (body.trim() === "") {
        throw new Error("Post body must not be empty");
      }

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();

      context.pubSub.publish("NEW_POST", {
        newPost: post,
      });

      return post;
    },

    /**
     *
     * @param _
     * @param postId
     * @param context
     * @returns {Promise<string>}
     */
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return "Post deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    /**
     *
     * @param _
     * @param postId
     * @param context
     * @returns {Promise<void>}
     */
    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }

        await post.save();
        return post;
      } else {
        throw new UserInputError("Post not found");
      }
    },
  },

  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_POST"),
    },
  },
};

export default postsResolvers;
