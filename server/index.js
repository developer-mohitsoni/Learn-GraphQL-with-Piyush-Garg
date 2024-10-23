const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");

const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const startServer = async () => {
  const app = express();

  const typeDefs = `
  #graphql
  
    type Todo {
      id: ID!
      title: String!
      completed: Boolean!
    }

    type Query {
      getTodos: [Todo]!
    }
  `;

  const resolvers = {
    Query: {
      getTodos: async () => {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos"
        );
        return response.data;
      },
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });

  app.use(bodyParser.json());
  app.use(cors());

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(8000, () => {
    console.log("Server started on http://localhost:8000/graphql");
  });
};

startServer();
