const express = require('express');
const accountsRouter = require('./routers/accountsRouter')


const server = express();

server.use(express.json());

server.use('/api', accountsRouter)

module.exports = server;