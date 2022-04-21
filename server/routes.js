const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');
const { connect } = require('superagent');

// TODO: fill in your connection details here
const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});

connection.connect();


// ********************************************
//            SIMPLE ROUTE EXAMPLE
// ********************************************

// Route 1 (handler)
async function hello(req, res) {
    // a GET request to /hello?name=Steve
    if (req.query.name) {
        res.send(`Hello, ${req.query.name}! Welcome to the NCVS server!`)
    } else {
        res.send(`Hello! Welcome to the NCVS server!`)
    }
}


// ********************************************
//                  WARM UP 
// ********************************************

// Route 2 (handler)
async function test(req, res) {
    const age = req.query.age? req.query.age : -1;
    if (req.query.age && !isNaN(parseInt(req.query.age))) {
        // This is the case where page is defined.
        // The SQL schema has the attribute OverallRating, but modify it to match spec! 
        // TODO: query and return results here:
        console.log("wrong place reached");
        connection.query(`SELECT count(Age) as Num_people_this_age  
        FROM Person
        WHERE Age = ${age}
        `, function (error, results, fields) {
            if (error) {
                console.log(error);
                res.json({ error: error });
            } else if (results) {
                res.json({ results: results });
            }
        });
    }
}

// ********************************************
//               GENERAL ROUTES
// ********************************************


// Route 3 (handler)
async function all_households(req, res) {
    // TODO: TASK 4: implement and test, potentially writing your own (ungraded) tests
    // We have partially implemented this function for you to 
    // parse in the league encoding - this is how you would use the ternary operator to set a variable to a default value
    // in reality, league will never be undefined since URLs will need to match matches/:league for the request to be routed here... 
    const pagesize = req.query.pagesize ? req.query.pagesize : 10;
    // use this league encoding in your query to furnish the correct results

    if (req.query.page && !isNaN(parseInt(req.query.page))) {
        // This is the case where page is defined.
        // The SQL schema has the attribute OverallRating, but modify it to match spec! 
        // TODO: query and return results here:
        connection.query(`SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals  
        FROM Matches 
        WHERE Division = '${league}'
        ORDER BY HomeTeam, AwayTeam
        LIMIT ${(parseInt(req.query.page)-1)*pagesize},${pagesize}`, function (error, results, fields) {
            if (error) {
                console.log(error);
                res.json({ error: error });
            } else if (results) {
                res.json({ results: results });
            }
        });
    } else {
        // we have implemented this for you to see how to return results by querying the database
        connection.query(`SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals  
        FROM Matches 
        WHERE Division = '${league}'
        ORDER BY HomeTeam, AwayTeam`, function (error, results, fields) {
            if (error) {
                console.log(error);
                res.json({ error: error });
            } else if (results) {
                res.json({ results: results });
            }
        });
    }
}

// Route 4 (handler)
async function all_persons(req, res) {
    // TODO: TASK 5: implement and test, potentially writing your own (ungraded) tests
    const pagesize = req.query.pagesize ? req.query.pagesize : 10;
    if (req.query.page && !isNaN(parseInt(req.query.page))) {
        connection.query(`select PlayerId, Name, Nationality,OverallRating as Rating,
        Potential,Club,Value
        from Players
        order by Name
        limit ${(parseInt(req.query.page)-1)*pagesize},${pagesize}`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    } else {
        // we have implemented this for you to see how to return results by querying the database
        connection.query(`select PlayerId, Name, Nationality,OverallRating as Rating,
        Potential,Club,Value
        from Players
        order by Name`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
    //return res.json({error: "Not implemented"})
}




// ********************************************
//             SEARCH ROUTES
// ********************************************

// Route 7 (handler)
async function search_households(req, res) {
    // TODO: TASK 8: implement and test, potentially writing your own (ungraded) tests
    // IMPORTANT: in your SQL LIKE matching, use the %query% format to match the search query to substrings, not just the entire string
    var home = req.query.Home? req.query.Home :'';
    var away = req.query.Away ? req.query.Away :'' ;
    var page = req.query.page;
    var pagesize = req.query.pagesize ? req.query.pagesize:10;
    
    if (req.query.page && !isNaN(parseInt(req.query.page))) {
        connection.query(`select MatchId,Date,Time, HomeTeam as Home,AwayTeam as Away, FullTimeGoalsH as HomeGoals,
        FullTimeGoalsA as AwayGoals
        from Matches
        where HomeTeam like '%${home}%' and AwayTeam like '%${away}%'
        order by HomeTeam,AwayTeam
        limit ${(parseInt(req.query.page)-1)*pagesize},${pagesize}
        `,function(error, results,fields){
            if(error){
                res.json({error:error});
            } else if (results){
                if(results.length ==0){
                    res.json({results:[]});
                } else {
                    res.json({results:results});
                }    
            }
        });
    } else {
        connection.query(`select MatchId,Date,Time, HomeTeam as Home,AwayTeam as Away, FullTimeGoalsH as HomeGoals,
        FullTimeGoalsA as AwayGoals
        from Matches
        where HomeTeam like '%${home}%' and AwayTeam like '%${away}%'
        order by HomeTeam,AwayTeam
        `,function(error, results,fields){
            if(error){
                res.json({error:error});
            } else if (results){
                if(results.length ==0){
                    res.json({results:[]});
                } else {
                    res.json({results:results});
                }    
            }
        });
    }
}

// Route 8 (handler)
async function search_persons(req, res) {
    // TODO: TASK 9: implement and test, potentially writing your own (ungraded) tests
    // IMPORTANT: in your SQL LIKE matching, use the %query% format to match the search query to substrings, not just the entire string
    var name = req.query.Name? req.query.Name :'';
    var nationality = req.query.Nationality ? req.query.Nationality :'' ;
    var club = req.query.Club ? req.query.Club :'' ;
    var ratinglow = req.query.RatingLow ? req.query.RatingLow :0;
    var ratinghigh = req.query.RatingHigh ? req.query.RatingHigh :100 ;
    var plow = req.query.PotentialLow ? req.query.PotentialLow :0;
    var phigh = req.query.PotentialHigh ? req.query.PotentialHigh :100 ;
    var pagesize = req.query.pagesize ? req.query.pagesize:10;
    
    if (req.query.page && !isNaN(parseInt(req.query.page))) {
        connection.query(`select PlayerId,Name, Nationality, OverallRating as Rating, Potential,Club,Value
        from Players
        where Name like '%${name}%' and Nationality like'%${nationality}%' and Club like'%${club}%' 
        and OverallRating>=${ratinglow} and
              OverallRating <=${ratinghigh} and Potential >= ${plow} and Potential<=${phigh}
        order by Name
        limit ${(parseInt(req.query.page)-1)*pagesize},${pagesize}
        `,function(error, results,fields){
            if(error){
                res.json({error:error});
            } else if (results){
                if(results.length ==0){
                    res.json({results:[]});
                } else {
                    res.json({results:results});
                }    
            }
        });
    } else {
        connection.query(`select PlayerId,Name, Nationality, OverallRating as Rating, Potential,Club,Value
        from Players
        where Name like '%${name}%' and Nationality like '%${nationality}%' and Club like'%${club}%' 
        and OverallRating>=${ratinglow} and
              OverallRating <=${ratinghigh} and Potential >= ${plow} and Potential<=${phigh}
        order by Name
        `,function(error, results,fields){
            if(error){
                res.json({error:error});
            } else if (results){
                if(results.length ==0){
                    res.json({results:[]});
                } else {
                    res.json({results:results});
                }    
            }
        });
    }
}

module.exports = {
    hello,
    test,
    all_households,
    all_persons,
    search_households,
    search_persons
}




