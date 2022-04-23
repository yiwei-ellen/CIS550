const express = require('express');
const mysql      = require('mysql');
var cors = require('cors')


const routes = require('./routes')
const config = require('./config.json')

const app = express();

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

// Route 1 - register as GET 
app.get('/hello', routes.hello)

// Route 2 - register as GET 
app.get('/test', routes.test)

// Route 3 - register as GET 
//app.get('/households', routes.all_households)

// Route 4 - register as GET 
// app.get('/persons', routes.all_persons)

// Route 5 - register as GET 
//app.get('/match', routes.match)

// Route 6 - register as GET 
//app.get('/player', routes.player)

// Route 7 - register as GET 
app.get('/search/households', routes.search_households)

// Route 8 - register as GET 
app.get('/search/persons', routes.search_persons)





app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
