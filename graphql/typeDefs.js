import { gql } from "apollo-server";

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createAt: String!
    username: String!
    comments: String!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  
  type Comment {
    id: ID!
    createAt: String!
    username: String!
    body: String!
  }

  type Like {
    id: ID!
    createAt: String!
    username: String!
  }
  
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createAt: String!
  }
  
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  
  type Query {
    getPosts: [Post]
    getPost(positId: ID!): Post
  }
  
  type Mutation {
    register(registerInput: RegisterInput) : User!
    login(username: String!, password: String!) : User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Comment!
    likePost(postId: ID!): Post!
  }
  
  type Subscription {
    newPost: Post!
  }
`;

export default typeDefs;
