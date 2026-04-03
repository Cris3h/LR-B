const express = require('express');
const router = require('./routes/index');
const setMiddlewares = require('./config/setMiddlewares.js');


const server = express();
setMiddlewares(server);

server.use('/', router);

server.use("*", (req, res) => {
  res.status(404).send("Not Found");
});

server.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    error: true,
    message: err.message
  });
});



module.exports = server;
