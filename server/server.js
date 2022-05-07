const express = require('express');
const mysql      = require('mysql');
var cors = require('cors')


const routes = require('./routes')
const config = require('./config.json')

const app = express();

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));


// Route 1 - register as GET 
app.get('/search/households', routes.search_households)

// Route 2 - register as GET 
app.get('/search/persons', routes.search_persons)

// Route 3-6 Visualization routes
app.get('/visualization1', routes.weaponVisualization)

app.get('/visualization2', routes.monthVisualization)

app.get('/most_criminal_month',routes.mostCriminalMonth)

app.get('/vis5',routes.polInvolved)

//Route 7-9 Person Crime page
app.get('/rel_job_victim',routes.relJobVictim)

app.get('/rel_race_victim',routes.relRaceVictim)

app.get('/rel_old_victim',routes.relOldVictim)

//Route 10-12 House Crime page

app.get('/rel_income_house',routes.relIncomeHouse)

app.get('/rel_race_house',routes.relRaceHouse)

app.get('/rel_land_house',routes.relLandHouse)


app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
