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

    type User{
        id: ID!
        name: String!
        username: String!
        email: String!
        phone: String!
        website: String!
    }

    type Todo {
      id: ID!
      title: String!
      completed: Boolean!
      user: User
      userId: ID!
    }

    type Query {
      getTodos: [Todo]
      getAllUsers: [User]
      getUserBy(id: ID!): User
    }
  `;

  const resolvers = {
    Todo: {
      user: async (todo) => {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${todo.userId}`
        );

        return response.data;
      },
    },
    Query: {
      getTodos: async () => {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos"
        );

        return response.data;
      },
      getAllUsers: async () => {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );

        return response.data;
      },
      getUserBy: async (_, { id }) => {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`
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
