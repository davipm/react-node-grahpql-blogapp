import { ApolloServer, PubSub } from "apollo-server";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";
import database from "./config/db";
import dotenv from "dotenv";

const pubSub = new PubSub();
dotenv.config({ path: "./config/config.env" });

database
  .connectDatabase()
  .then(() => console.log("Database connected success"));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubSub }),
});

server.listen(4000).then(({ url }) => {
  console.log(`🚀Server ready at ${url}`);
});
