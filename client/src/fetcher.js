import config from './config.json'

//TO DO
const getAllHouseholds = async (page, pagesize, league) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/households/${league}?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}
/*
const getAllPersons = async (page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/persons?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}
/*
const getMatch = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/match?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}*/

const getPlayer = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/player?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

//TO DO
const getHouseholdSearch = async (home, away, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/matches?Home=${home}&Away=${away}&page=${page}&pagesize=${pagesize}`, {
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