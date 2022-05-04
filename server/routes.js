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





// Route 7 (handler)
async function search_households(req, res) {
    // TODO: TASK 8: implement and test, potentially writing your own (ungraded) tests
    // IMPORTANT: in your SQL LIKE matching, use the %query% format to match the search query to substrings, not just the entire string
    var Year = req.query.Year? req.query.Year :'';
    var Land_use_OG = req.query.Land_use_OG? req.query.Land_use_OG :'';
    var Land_use_2015 = req.query.Land_use_2015? req.query.Land_use_2015 :'';
    var Living_quarter_OG = req.query.Living_quarter_OG? req.query.Living_quarter_OG :'';
    var Living_quarter_2016 = req.query.Living_quarter_2016? req.query.Living_quarter_2016 :'';
    var Income = req.query.Income? req.query.Income :'';
    var Income_2015 = req.query.Income_2015? req.query.Income_2015 :'';
    var Num_crime_reported_low = req.query.Num_crime_reported_low? req.query.Num_crime_reported_low :'';
    var Num_crime_reported_high = req.query.Num_crime_reported_high? req.query.Num_crime_reported_high :'';
    var Head_race = req.query.Head_race? req.query.Head_race :'';
    var Head_hispanic = req.query.Head_hispanic? req.query.Head_hispanic :'';
    var page = req.query.page? req.query.pagesize:1;
    var pagesize = req.query.pagesize ? req.query.pagesize:10;
    
    if (req.query.page && !isNaN(parseInt(req.query.page))) {
        connection.query(`select Hid, YEAR, Land_use_OG, Land_use_2015,
        Living_quarter_OG, Living_quarter_2016, Income, Income_2015,
        Num_crime_reported, Head_race, Head_hispanic
        from Household
        where YEAR = ${Year} and Land_use_OG LIKE '%${Land_use_OG}%' and Land_use_2015 LIKE '%${Land_use_2015}%'
        and Living_quarter_OG LIKE '%${Living_quarter_OG}%' and Living_quarter_2016 LIKE '%%'
        and Income LIKE '%${Income}%' and Income_2015 LIKE '%${Income_2015}%'
        and Num_crime_reported >= ${Num_crime_reported_low} and Num_crime_reported <=${Num_crime_reported_high}
        and Head_race LIKE '%${Head_race}%' and Head_hispanic LIKE '%${Head_hispanic}%'
        order by Hid
        limit ${(parseInt(page)-1)*pagesize},${pagesize}
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
        connection.query(`select Hid, YEAR, Land_use_OG, Land_use_2015,
        Living_quarter_OG, Living_quarter_2016, Income, Income_2015,
        Num_crime_reported, Head_race, Head_hispanic
        from Household
        where YEAR = ${Year} and Land_use_OG LIKE '%${Land_use_OG}%' and Land_use_2015 LIKE '%${Land_use_2015}%'
        and Living_quarter_OG LIKE '%${Living_quarter_OG}%' and Living_quarter_2016 LIKE '%%'
        and Income LIKE '%${Income}%' and Income_2015 LIKE '%${Income_2015}%'
        and Num_crime_reported >= ${Num_crime_reported_low} and Num_crime_reported <=${Num_crime_reported_high}
        and Head_race LIKE '%${Head_race}%' and Head_hispanic LIKE '%%'
        order by Hid
        limit ${(parseInt(page)-1)*pagesize},${pagesize}
        `,function(error, results,fields){
            if(error){
                console.log(error)
                res.json({error:error});
            } else if (results){
                console.log(results)
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
    var Year = req.query.Year? req.query.Year :'';
    var Age = req.query.Age? req.query.Age :'';
    var Sex = req.query.Sex? req.query.Sex :'';
    var Race = req.query.Race? req.query.Race :'';
    var Hispanic = req.query.Hispanic? req.query.Hispanic :'';
    var Times_moved_low = req.query.Times_moved_low? req.query.Times_moved_low :'';
    var Times_moved_high = req.query.Times_moved_high? req.query.Times_moved_high :'';
    var If_job_sixmonth = req.query.If_job_sixmonth? req.query.If_job_sixmonth :'';
    var Job_specific = req.query.Job_specific? req.query.Job_specific :'';
    var Job_type = req.query.Job_type? req.query.Job_type :'';
    var Num_crime_low = req.query.Num_crime_low? req.query.Num_crime_low :'';
    var Num_crime_high = req.query.Num_crime_high? req.query.Num_crime_high :'';

    var page = req.query.page ? req.query.page:1;
    var pagesize = req.query.pagesize ? req.query.pagesize:10;

    // console.log('sb')
    
    if (req.query.page && !isNaN(parseInt(req.query.page))) {
        connection.query(`select Pid, Year, Age, Sex, Race, Hispanic,
        Times_moved, If_job_sixmonth, Job_specific, Job_type, Num_crime
        from Person
        where Year = ${Year} and Age = ${Age} and Sex like '%${Sex}%' 
        and Race like '%${Race}%' and Hispanic like '%${Hispanic}%'
        and Times_moved>=${Times_moved_low} and Times_moved <=${Times_moved_high} 
        and If_job_sixmonth like '%${If_job_sixmonth }%'
        and Job_specific like '%${Job_specific}%'
        and Job_type like '%${Job_type}%'
        and Num_crime >= ${Num_crime_low} and Num_crime<=${Num_crime_high}
        order by Year
        limit ${(parseInt(page)-1)*pagesize},${pagesize}
        `,function(error, results,fields){
            if(error){
                console.log(error)
                res.json({error:error});
            } else if (results){
                console.log(results)
                if(results.length ==0){
                    res.json({results:[]});
                } else {
                    res.json({results:results});
                }    
            }
        });
    } else {
        connection.query(`select Pid, Year, Age, Sex, Race, Hispanic,
        Times_moved, If_job_sixmonth, Job_specific, Job_type, Num_crime
        from Person
        where Year = ${Year} and Age = ${Age} and Sex like '%${Sex}%' 
        and Race like '%${Race}%' and Hispanic like '%${Hispanic}%'
        and Times_moved>=${Times_moved_low} and Times_moved <=${Times_moved_high} 
        and If_job_sixmonth like '%${If_job_sixmonth }%'
        and Job_specific like '%${Job_specific}%'
        and Job_type like '%${Job_type}%'
        and Num_crime >= ${Num_crime_low} and Num_crime<=${Num_crime_high}
        order by Year
        limit ${(parseInt(page)-1)*pagesize},${pagesize}
        `,function(error, results,fields){
            if(error){
                console.log(error)
                res.json({error:error});
            } else if (results){
                console.log(results)
                if(results.length ==0){
                    res.json({results:[]});
                } else {
                    res.json({results:results});
                }    
            }
        });
    }
}

    // Route 9 (handler)
async function weaponVisualization(req, res) {
    // TODO: TASK 9: implement and test, potentially writing your own (ungraded) tests
    // IMPORTANT: in your SQL LIKE matching, use the %query% format to match the search query to substrings, not just the entire string
    console.log("hi")
    
    connection.query(`WITH VictimHouse AS (
        SELECT Hid, Victim_id AS Pid, If_weapon AS weapon_involved
        FROM Incident
    )
    SELECT h.Income AS Income_bracket,
           COUNT(CASE WHEN v.weapon_involved = 1 THEN 1 END) / COUNT(*) AS Weapon_involved,
           COUNT(CASE WHEN v.weapon_involved = 2 THEN 1 END) / COUNT(*) AS No_weapon_involved,
           COUNT(CASE WHEN v.weapon_involved = 3 THEN 1 END) / COUNT(*) AS Do_not_know,
           COUNT(CASE WHEN v.weapon_involved > 3 THEN 1 END) / COUNT(*) AS Others
    FROM Household h JOIN VictimHouse v ON h.Hid = v.Hid
    GROUP BY h.Income
    HAVING h.Income <> "Out of universe" and h.Income <> "Residue" and h.Income <> "Less than $5,000"
    and h.Income <> "$75,000 and over"
    ORDER BY cast(Substr(h.Income, 2, 6) as UNSIGNED) ASC;
    `,function(error, results,fields){
        if(error){
            console.log(error)
            res.json({error:error});
        } else if (results){
            console.log(results)
            if(results.length ==0){
                res.json({results:[]});
            } else {
                res.json({results:results});
            }    
        }
    });
}

// Route 10 (handler)
async function monthVisualization(req, res) {
// TODO: TASK 9: implement and test, potentially writing your own (ungraded) tests
// IMPORTANT: in your SQL LIKE matching, use the %query% format to match the search query to substrings, not just the entire string

connection.query(`WITH Crime AS (
    SELECT Month,
           COUNT(CASE WHEN V4066  = 1 THEN 1 END) AS Something_taken,
           COUNT(CASE WHEN V4067  = 1 THEN 1 END) AS Attempted_theft,
           COUNT(CASE WHEN V4068  = 1 THEN 1 END) AS Harassed_abusive_language,
           COUNT(CASE WHEN V4069  = 1 THEN 1 END) AS Sexual_contact_force,
           COUNT(CASE WHEN V4070  = 1 THEN 1 END) AS Sexual_contact_no_force,
           COUNT(CASE WHEN Forcible_entry_home  = 1 THEN 1 END) AS Forcible_entry_home,
           COUNT(CASE WHEN V4072  = 1 THEN 1 END) AS Forcible_entry_car,
           COUNT(CASE WHEN V4073  = 1 THEN 1 END) AS Property_damage,
           COUNT(CASE WHEN V4074  = 1 THEN 1 END) AS Attempted_prop_damage,
           COUNT(CASE WHEN V4075  = 1 THEN 1 END) AS Others
    FROM Incident
    GROUP BY Month
    ), Crime_union AS (
        SELECT crime,
               Month,
               SUM(value) AS value
        FROM (
            SELECT Month, Something_taken AS value, "Something_taken" AS crime
            FROM Crime
            UNION ALL
            SELECT Month, Attempted_theft AS value, "Attempted_theft" AS crime
            FROM Crime
            UNION ALL
            SELECT Month, Harassed_abusive_language AS value, "Harassed_abusive_language" AS crime
            FROM Crime
            UNION ALL
            SELECT Month, Sexual_contact_force AS value, "Sexual_contact_force" AS Sexual_contact_force
            FROM Crime
            UNION ALL
            SELECT Month, Sexual_contact_no_force AS value, "Sexual_contact_no_force" AS crime
            FROM Crime
            UNION ALL
            SELECT Month, Forcible_entry_home AS value, "Forcible_entry_home" AS crime
            FROM Crime
            UNION ALL
            SELECT Month, Forcible_entry_car AS value, "Forcible_entry_car" AS crime
            FROM Crime
            UNION ALL
            SELECT Month, Property_damage AS value, "Property_damage" AS crime
            FROM Crime
            UNION ALL
            SELECT Month, Attempted_prop_damage AS value, "Attempted_prop_damage" AS crime
            FROM Crime
            UNION ALL
            SELECT Month, Others AS value, "Others" AS crime
            FROM Crime
            ) a
        GROUP by crime, Month
    ), Max_Month AS (
    SELECT crime, MAX(value) AS max_value
    FROM Crime_union
    GROUP BY crime
    )
SELECT m.crime AS crime, c.Month as Max_month
FROM Max_Month m JOIN Crime_union c ON m.crime = c.crime AND m.max_value= c.value
ORDER BY c.Month ASC;
`,function(error, results,fields){
    if(error){
        console.log(error)
        res.json({error:error});
    } else if (results){
        console.log(results)
        if(results.length ==0){
            res.json({results:[]});
        } else {
            res.json({results:results});
        }    
    }
});
}

async function relJobVictim (req,res){
    console.log("function called");
    connection.query(`select year as Year, COUNT(CASE WHEN If_job_sixmonth = 'No' THEN 1 END)/count(*) as Proportion
    from Person P
    where P.If_job_sixmonth = 'No' or P.If_job_sixmonth = 'Yes'
    group by P.year
        `,function(error, results,fields){
            if(error){
                console.log(error)
                res.json({error:error});
            } else if (results){
                console.log("job victim database called, results: ");
                //console.log(results)
                if(results.length ==0){
                    res.json({results:[]});
                } else {
                    ans = []
                    ans=JSON.parse(JSON.stringify(results))
                    console.log(ans)
                    res.json({results:ans});
                }    
            }
        });
}

async function relRaceVictim (req,res){
    console.log("function called");
    connection.query(`select Year, COUNT(CASE WHEN Hispanic = 'Yes' THEN 1 END)/count(*) as Proportion
    from Person P
    where P.Hispanic = 'No' or P.Hispanic = 'Yes'
    group by P.year
        `,function(error, results,fields){
            if(error){
                console.log(error)
                res.json({error:error});
            } else if (results){
                console.log("race victim database called, results: ");
                //console.log(results)
                if(results.length ==0){
                    res.json({results:[]});
                } else {
                    ans = []
                    ans=JSON.parse(JSON.stringify(results))
                    console.log(ans)
                    res.json({results:ans});
                }    
            }
        });
}

async function relOldVictim (req,res){
    console.log("function called");
    connection.query(`select Year, COUNT(CASE WHEN Age>=65 THEN 1 END)/count(*) as Proportion
    from Person P
    group by P.Year
        `,function(error, results,fields){
            if(error){
                console.log(error)
                res.json({error:error});
            } else if (results){
                console.log("old victim database called, results: ");
                //console.log(results)
                if(results.length ==0){
                    res.json({results:[]});
                } else {
                    ans = []
                    ans=JSON.parse(JSON.stringify(results))
                    console.log(ans)
                    res.json({results:ans});
                }    
            }
        });
}

module.exports = {
    hello,
    test,
    search_households,
    search_persons,
    weaponVisualization,
    monthVisualization,
    relJobVictim,
    relRaceVictim,
    relOldVictim,

}




