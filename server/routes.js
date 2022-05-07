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
//               GENERAL ROUTES
// ********************************************




// Route 7 (handler)
async function search_households(req, res) {
    // TODO: TASK 8: implement and test, potentially writing your own (ungraded) tests
    // IMPORTANT: in your SQL LIKE matching, use the %query% format to match the search query to substrings, not just the entire string
    var Year_low = req.query.Year_low? req.query.Year_low :'';
    var Year_high = req.query.Year_high? req.query.Year_high :'';
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
        where YEAR >= ${Year_low} and YEAR <= ${Year_high} and Land_use_OG LIKE '%${Land_use_OG}%' and Land_use_2015 LIKE '%${Land_use_2015}%'
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
        where YEAR >= ${Year_low} and YEAR <= ${Year_high} and Land_use_OG LIKE '%${Land_use_OG}%' and Land_use_2015 LIKE '%${Land_use_2015}%'
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
    var Year_low = req.query.Year_low? req.query.Year_low :'';
    var Year_high = req.query.Year_high? req.query.Year_high :'';
    var Age_low = req.query.Age_low? req.query.Age_low :'';
    var Age_high = req.query.Age_high? req.query.Age_high :'';
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
        where YEAR >= ${Year_low} and YEAR <= ${Year_high} and Age >= ${Age_low} and Age <=${Age_high} and Sex like '%${Sex}%' 
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
        where YEAR >= ${Year_low} and YEAR <= ${Year_high}  and Age >= ${Age_low} and Age <=${Age_high} and Sex like '%${Sex}%' 
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
    connection.query(`select Year, COUNT(CASE WHEN If_job_sixmonth = 'No' THEN 1 END)/count(*) as Proportion
    from Person P
    where P.If_job_sixmonth = 'No' or P.If_job_sixmonth = 'Yes' and  pid in( select Victim_id from Incident)
    group by P.year;
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
    connection.query(`select Year, COUNT(CASE WHEN Hispanic = 'Yes' THEN 1 END)/count(*)as Proportion
    from Person P
    where pid in( select Victim_id from Incident)
    group by P.year;
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

async function mostCriminalMonth (req,res){
    console.log("function called");
    connection.query(`WITH Crime AS (
        SELECT Month, YEAR, COUNT(*) AS crime_num
        FROM Incident
        GROUP BY Month, YEAR
        ), MaxCrime AS (
        SELECT YEAR, MAX(crime_num) AS max_crime
        FROM Crime
        GROUP BY YEAR
        )
    SELECT Month, m.YEAR AS YEAR, max_crime
    FROM MaxCrime m JOIN Crime c ON m.YEAR = c.YEAR AND m.max_crime = c.crime_num
    ORDER BY YEAR DESC;
        `,function(error, results,fields){
            if(error){
                console.log(error)
                res.json({error:error});
            } else if (results){
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
    where pid in( select Victim_id from Incident)
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

async function polInvolved (req,res){
    connection.query(`WITH Inci AS (
        SELECT Hid, Victim_id, Month, YEAR, police_involve
        FROM Incident
        WHERE YEAR < 2019
        ), House AS (
        SELECT Hid, Income
        FROM Household
        ), Pers AS (
        SELECT Pid, Age
        FROM Person
        WHERE Age > 15
        )
    SELECT Month, i.YEAR AS Year, Income,
               COUNT(*) AS count,
               COUNT(CASE WHEN police_involve  = 1 THEN 1 END) AS police_involved,
               COUNT(CASE WHEN police_involve  = 2 THEN 1 END) AS police_not_involved
        FROM Inci i JOIN House h JOIN Pers p ON i.Hid = h.Hid AND i.Victim_id = p.Pid
        GROUP BY Month, i.YEAR, Income
        Having police_involved / count > 0.05
        ORDER BY YEAR DESC, Month ASC
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

async function relRaceHouse (req,res){
    console.log("function called");
    connection.query(`with A as (select Head_race,sum(Num_crime_reported) as coun
    from Household
    where hid in (select hid from Incident) and Num_crime_reported >=1
    group by Head_race),
     B as (select sum(Num_crime_reported) as total from Household)
        select A.Head_race as Race, coun/total as proportion
        from A, B;
        `,function(error, results,fields){
            if(error){
                console.log(error)
                res.json({error:error});
            } else if (results){
                console.log("racehouse database called, results: ");
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

async function relIncomeHouse (req,res){
    console.log("function called");
    connection.query(`with A as (select Income,sum(Num_crime_reported) as coun
    from Household
    where hid in (select hid from Incident) and Num_crime_reported >=1
    group by Income),
    B as (select Income,count(*) as total
    from Household
    where hid in (select hid from Incident)
    group by Income)
        select A.Income as Income, A.coun/B.total as Avg_cases
        from A join B on A.Income=B.Income
        Order by Income ASC
        `,function(error, results,fields){
            if(error){
                console.log(error)
                res.json({error:error});
            } else if (results){
                console.log("racehouse database called, results: ");
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

async function relLandHouse (req,res){
    console.log("function called");
    connection.query(`with A as (select Living_quarter_2016,sum(Num_crime_reported) as coun
    from Household
    where hid in (select hid from Incident) and Num_crime_reported >=1
    group by Living_quarter_2016),
    B as (select Living_quarter_2016,count(*) as total
    from Household
    where hid in (select hid from Incident)
    group by Living_quarter_2016)
        select A.Living_quarter_2016 as Land_type, A.coun/B.total as Avg_cases
        from A join B on A.Living_quarter_2016=B.Living_quarter_2016;    
        `,function(error, results,fields){
            if(error){
                console.log(error)
                res.json({error:error});
            } else if (results){
                console.log("land house database called, results: ");
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
    //full scope search
    search_households,
    search_persons,
    //complex queries
    weaponVisualization,
    monthVisualization,
    mostCriminalMonth,
    polInvolved,
    //observations display
    relJobVictim,
    relRaceVictim,
    relOldVictim,
    relRaceHouse,
    relLandHouse,
    relIncomeHouse

}




