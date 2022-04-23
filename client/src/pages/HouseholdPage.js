import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";
import { format } from 'd3-format';

import {
    Table,
    Pagination,
    Row,
    Col,
    Divider,
    Slider,
    Rate 
} from 'antd'

import { getHouseholdSearch } from '../fetcher'


import MenuBar from '../components/MenuBar';

const householdColumns = [
    {
        title: 'Year',
        dataIndex: 'Year',
        key: 'Year',
        sorter: (a, b) => a.Year.localeCompare(b.Year)
    },
    {
        title: 'Age',
        dataIndex: 'Age',
        key: 'Age',
        sorter: (a, b) => a.Age.localeCompare(b.Age)
    },
    {
        title: 'Sex',
        dataIndex: 'Sex',
        key: 'Sex',
        sorter: (a, b) => a.Sex.localeCompare(b.Sex)
    },
    {
        title: 'Race',
        dataIndex: 'Race',
        key: 'Race',
        sorter: (a, b) => a.Race.localeCompare(b.Race)
    },
    {
        title: 'Hispanic',
        dataIndex: 'Hispanic',
        key: 'Hispanic',
        sorter: (a, b) => a.Hispanic.localeCompare(b.Hispanic)
    },
    {
        title: 'Times_moved',
        dataIndex: 'Times_moved',
        key: 'Times_moved',
        sorter: (a, b) => a.Times_moved - b.Times_moved
    },
    {
        title: 'If_job_sixmonth',
        dataIndex: 'If_job_sixmonth',
        key: 'If_job_sixmonth',
        sorter: (a, b) => a.If_job_sixmonth.localeCompare(b.If_job_sixmonth)
    },
    {
        title: 'Job_specific',
        dataIndex: 'Job_specific',
        key: 'Job_specific',
        sorter: (a, b) => a.Job_specific.localeCompare(b.Job_specific)
    },
    {
        title: 'Job_type',
        dataIndex: 'Job_type',
        key: 'Job_type',
        sorter: (a, b) => a.Job_type.localeCompare(b.Job_type)
    },
    {
        title: 'Num_crime',
        dataIndex: 'Num_crime',
        key: 'Num_crime',
        sorter: (a, b) => a.Num_crime.localeCompare(b.Num_crime)
    },
    // TASK 19: copy over your answers for tasks 7 - 9 to add columns for potential, club, and value
];


class HouseholdPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            awayQuery: "",
            homeQuery: "",
            matchesResults: [],
            selectedMatchId: window.location.search ? window.location.search.substring(1).split('=')[1] : 0,
            selectedMatchDetails: null

        }

        this.handleAwayQueryChange = this.handleAwayQueryChange.bind(this)
        this.handleHomeQueryChange = this.handleHomeQueryChange.bind(this)
        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.goToMatch = this.goToMatch.bind(this)

    }



    handleAwayQueryChange(event) {
        this.setState({ awayQuery: event.target.value })
    }

    handleHomeQueryChange(event) {
        // TASK 10: update state variables appropriately. See handleAwayQueryChange(event) for reference
        this.setState({ homeQuery: event.target.value })
    }
    goToMatch(matchId) {
        window.location = `/matches?id=${matchId}`
    }

    updateSearchResults() {
        //TASK 11: call getyHouseholdSearch and update matchesResults in state. See componentDidMount() for a hint
        getHouseholdSearch(this.state.homeQuery, this.state.awayQuery, null, null).then(res => {
            this.setState({ matchesResults: res.results })
        })
    }

    componentDidMount() {
        getHouseholdSearch(this.state.homeQuery, this.state.awayQuery, null, null).then(res => {
            this.setState({ matchesResults: res.results })
        })


        
    }

    render() {
        return (
            <div>
                


            </div>
        )
    }
}

export default HouseholdPage

