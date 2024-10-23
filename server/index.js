const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");

const bodyParser = require("body-parser");
const cors = require("cors");

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({});

  app.use(bodyParser.json());
  app.use(cors());

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(8000, () => {
    console.log("Server started on http://localhost:8000/graphql");
  });
};

startServer();