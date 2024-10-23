const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { expressMiddleware } = require("@apollo/server/express4");
const apolloServer = require("./myApolloServer/apolloServer");

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Start the Apollo Server
const startApolloServer = async () => {
  await apolloServer.start();
  app.use("/graphql", expressMiddleware(apolloServer));
};

module.exports = { app, startApolloServer };
