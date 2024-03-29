import { AuthenticationError, UserInputError } from "apollo-server";
import checkAuth from "../../util/check-auth";
import Post from "../../models/Post";

const commentResolver = {
  Mutation: {
    /**
     *
     * @param _
     * @param postId
     * @param body
     * @param context
     * @returns {Promise<*>}
     */
    async createComment(_, { postId, body }, context) {
      const { username } = checkAuth(context);
      if (body.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: {
            body: "Comment body must not empty",
          },
        });
      }

      const post = await Post.findById(postId);

      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else {
        throw new UserInputError("Post not found");
      }
    },

    /**
     *
     * @param _
     * @param postId
     * @param commentId
     * @param context
     * @returns {Promise<*>}
     */
    async deleteComment(_, { postId, commentId }, context) {
      const { username } = checkAuth(context);
      const post = await Post.findById(postId);

      if (post) {
        const commentIndex = post.comments.findIndex(
          (comment) => comment.id === commentId
        );

        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("Post not found");
      }
    },
  },
};

export default commentResolver;
