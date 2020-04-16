import { gql } from "apollo-server";

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
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
    posts: [Post]
    post(positId: ID!): Post
  }
  
  type Mutation {
    register(registerInput: RegisterInput) : User!
    login(username: String!, password: String!) : User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
  }
`;

export default typeDefs;
