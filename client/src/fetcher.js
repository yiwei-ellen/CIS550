import config from './config.json'


const getHouseholdSearch = async (Year_low, Year_high, Land_use_OG, Land_use_2015, Living_quarter_OG, Living_quarter_2016,
    Income, Income_2015, Num_crime_reported_low, Num_crime_reported_high, Head_race, Head_hispanic, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/Households?Year_low=${Year_low}`+
    `&Year_high=${Year_high}&Land_use_OG=${Land_use_OG}&Land_use_2015=${Land_use_2015}`+
    `&Living_quarter_OG=${Living_quarter_OG}&Living_quarter_2016=${Living_quarter_2016}`+
    `&Income=${Income}&Income_2015=${Income_2015}`+
    `&Num_crime_reported_low=${Num_crime_reported_low}&Num_crime_reported_high=${Num_crime_reported_high}`+
    `&Head_race=${Head_race}&Head_hispanic=${Head_hispanic}`+
    `page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getPersonsSearch = async (Year_low, Year_high, Age_low, Age_high, Sex, Race, Hispanic, Times_moved_low, Times_moved_high, If_job_sixmonth, Job_specific, Job_type, Num_crime_low, Num_crime_high, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/persons?Year_low=${Year_low}&Year_high=${Year_high}`+
    `&Age_low=${Age_low}&Age_high=${Age_high}&Sex=${Sex}&Race=${Race}&Hispanic=${Hispanic}&Times_moved_low=${Times_moved_low}&Times_moved_high=${Times_moved_high}`+
    `&If_job_sixmonth=${If_job_sixmonth}&Job_specific=${Job_specific}&Job_type=${Job_type}`+
    `&Num_crime_low=${Num_crime_low}&Num_crime_high=${Num_crime_high}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const relJobVictim = async() =>{
    var res = await fetch(`http://${config.server_host}:${config.server_port}/rel_job_victim`, {
        method: 'GET',
    })
    return res.json()
}

const relRaceVictim = async()=>{
    var res = await fetch(`http://${config.server_host}:${config.server_port}/rel_race_victim`, {
        method: 'GET',
    })
    return res.json()
}

const relOldVictim = async()=>{
    var res = await fetch(`http://${config.server_host}:${config.server_port}/rel_old_victim`, {
        method: 'GET',
    })
    return res.json()
}


const getVisualization1 = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/visualization1`)
    return res.json()
}

const getVisualization2 = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/visualization2`)
    return res.json()
}

const getVisualization4 = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/most_criminal_month`)
    return res.json()
}

const getVisualization5 = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/vis5`)
    return res.json()
}
const relRaceHouse = async()=>{
    var res = await fetch(`http://${config.server_host}:${config.server_port}/rel_race_house`, {
        method: 'GET',
    })
    return res.json()
}

const relLandHouse = async()=>{
    var res = await fetch(`http://${config.server_host}:${config.server_port}/rel_land_house`, {
        method: 'GET',
    })
    return res.json()
}

const relIncomeHouse = async()=>{
    var res = await fetch(`http://${config.server_host}:${config.server_port}/rel_income_house`, {
        method: 'GET',
    })
    return res.json()
}



export {
    getHouseholdSearch,
    getPersonsSearch,
    getVisualization1,
    getVisualization2,
    getVisualization4,
    getVisualization5,
    relJobVictim,
    relRaceVictim,
    relOldVictim,
    relLandHouse,
    relRaceHouse,
    relIncomeHouse
    
}