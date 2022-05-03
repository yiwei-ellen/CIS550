import React from 'react';
import {
    Select,
    Row,
} from 'antd'
import { format } from 'd3-format';

import MenuBar from '../components/MenuBar';
import { relJobVictim } from '../fetcher'
const wideFormat = format('.3r');
const { Option } = Select;
function handleChange(value) {
    console.log(`selected ${value}`);
}
class HcrimePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            YearQuery: 2015,
            AgeQuery: 40,
            SexQuery: '',
            RaceQuery: '',
            HispanicQuery: '',
            Times_moved_lowQuery: 0,
            Times_moved_highQuery: 40,
            If_job_sixmonthQuery: '',
            Job_specificQuery: '',
            Job_typeQuery: '',
            Num_crime_lowQuery: 0,
            Num_crime_highQuery: 40,
            selectedPlayerDetails: null,
            personsResults: []

        }

        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.handleYearQueryChange = this.handleYearQueryChange.bind(this)
        this.handleAgeQueryChange = this.handleAgeQueryChange.bind(this)
        this.handleSexQueryChange = this.handleSexQueryChange.bind(this)
        this.handleRaceQueryChange = this.handleRaceQueryChange.bind(this)
        this.handleHispanicQueryChange = this.handleHispanicQueryChange.bind(this)
        this.handleTimes_movedQueryChange = this.handleTimes_movedQueryChange.bind(this)
        this.handleIf_job_sixmonthQueryChange = this.handleIf_job_sixmonthQueryChange.bind(this)
        this.handleJob_specificQueryChange = this.handleJob_specificQueryChange.bind(this)
        this.handleJob_typeQueryChange = this.handleJob_typeQueryChange.bind(this)
        this.handleNum_crimeQueryChange = this.handleNum_crimeQueryChange.bind(this)
    }



    handleTimes_movedQueryChange(value) {
        this.setState({ Times_moved_lowQuery: value[0] })
        this.setState({ Times_moved_highQuery: value[1] })
    }

    updateSearchResults() {
        relJobVictim().then(res => {
            this.setState({ personsResults: res.results })
        })
        //TASK 23: call getPlayerSearch and update playerResults in state. See componentDidMount() for a hint
    }

    componentDidMount() {
        relJobVictim().then(res => {
            this.setState({ personsResults: res.results })
        })
    }

    render() {
        return (

            <div>

                <MenuBar />
                <Select defaultValue="disabled" style={{ width: 120 }} onChange={handleChange}>
                    <Option value="race">Race</Option>
                    <Option value="sex">Sex</Option>
                    <Option value="job">Job</Option>
                    <Option value="disabled" disabled>
                        Disabled
                    </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>


            </div>
        )
    }
}


export default HcrimePage