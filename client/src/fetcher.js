import config from './config.json'

//TO DO
const getAllHouseholds = async (page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/households?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getAllPersons = async (page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/persons?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

//TO DO
const getHouseholdSearch = async (Year, Land_use_OG, Land_use_2015, Living_quarter_OG, Living_quarter_2016,
    Income, Income_2015, Num_crime_reported_low, Num_crime_reported_high, Head_race, Head_hispanic, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/Households?Year=${Year}`+
    `&Land_use_OG=${Land_use_OG}&Land_use_2015=${Land_use_2015}`+
    `&Living_quarter_OG=${Living_quarter_OG}&Living_quarter_2016=${Living_quarter_2016}`+
    `&Income=${Income}&Income_2015=${Income_2015}`+
    `&Num_crime_reported_low=${Num_crime_reported_low}&Num_crime_reported_high=${Num_crime_reported_high}`+
    `&Head_race=${Head_race}&Head_hispanic=${Head_hispanic}`+
    `page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getPersonsSearch = async (Year, Age, Sex, Race, Hispanic, Times_moved_low, Times_moved_high, If_job_sixmonth, Job_specific, Job_type, Num_crime_low, Num_crime_high, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/persons?Year=${Year}`+
    `&Age=${Age}&Sex=${Sex}&Race=${Race}&Hispanic=${Hispanic}&Times_moved_low=${Times_moved_low}&Times_moved_high=${Times_moved_high}`+
    `&If_job_sixmonth=${If_job_sixmonth}&Job_specific=${Job_specific}&Job_type=${Job_type}`+
    `&Num_crime_low=${Num_crime_low}&Num_crime_high=${Num_crime_high}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}


export {
    getAllHouseholds,
    getHouseholdSearch,
    getPersonsSearch
}