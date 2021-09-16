const express = require('express');
const connect = require('./config/db');
const server = express();
var port = 2401;

const userController = require('./controller/user.controller');
const adminController = require('./controller/admin.controller');
server.use(express.json());

server.use('/users', userController);
server.use('/admin', adminController);


server.listen(port, async () => {
    await connect();
    console.log(`Express is running on port : ${port}`);
})