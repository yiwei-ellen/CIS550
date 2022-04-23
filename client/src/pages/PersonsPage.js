import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";
import {
    Table,
    Pagination,
    Select,
    Row,
    Col,
    Divider,
    Slider,
    Rate 
} from 'antd'
import { RadarChart } from 'react-vis';
import { format } from 'd3-format';




import MenuBar from '../components/MenuBar';
import { getPersonsSearch } from '../fetcher'
const wideFormat = format('.3r');

const personColumns = [
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


class PersonsPage extends React.Component {
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

    handleYearQueryChange(event) {
        this.setState({ YearQuery: event.target.value })
    }

    handleAgeQueryChange(event) {
        this.setState({ AgeQuery: event.target.value })
    }

    handleSexQueryChange(event) {
        this.setState({ SexQuery: event.target.value })
    }

    handleRaceQueryChange(event) {
        this.setState({ RaceQuery: event.target.value })
    }

    handleHispanicQueryChange(event) {
        this.setState({ HispanicQuery: event.target.value })
    }

    handleTimes_movedQueryChange(value) {
        this.setState({ Times_moved_lowQuery: value[0] })
        this.setState({ Times_moved_highQuery: value[1] })
    }

    handleIf_job_sixmonthQueryChange(event) {
        this.setState({ If_job_sixmonthQuery: event.target.value })
    }

    handleJob_specificQueryChange(event) {
        this.setState({ Job_specificQuery: event.target.value })
    }

    handleJob_typeQueryChange(event) {
        this.setState({ Job_typeQuery: event.target.value })
    }

    handleNum_crimeQueryChange(value) {
        this.setState({ Num_crime_lowQuery: value[0] })
        this.setState({ Num_crime_highQuery: value[1] })
        // TASK 22: parse value and update state variables appropriately. See handleRatingChange(value) for reference
    }



    updateSearchResults() {
        getPersonsSearch(this.state.YearQuery, this.state.AgeQuery, this.state.SexQuery, this.state.RaceQuery, this.state.HispanicQuery, 
            this.state.Times_moved_lowQuery, this.state.Times_moved_highQuery, this.state.If_job_sixmonthQuery, 
            this.state.Job_specificQuery, this.state.Job_typeQuery, this.state.Num_crime_lowQuery, 
            this.state.Num_crime_highQuery, 1, 10).then(res => {
            this.setState({ personsResults: res.results })
        })
        //TASK 23: call getPlayerSearch and update playerResults in state. See componentDidMount() for a hint

    }

    componentDidMount() {
        getPersonsSearch(this.state.YearQuery, this.state.AgeQuery, this.state.SexQuery, this.state.RaceQuery, this.state.HispanicQuery, 
            this.state.Times_moved_lowQuery, this.state.Times_moved_highQuery, this.state.If_job_sixmonthQuery, 
            this.state.Job_specificQuery, this.state.Job_typeQuery, this.state.Num_crime_lowQuery, 
            this.state.Num_crime_highQuery, 1, 10).then(res => {
            this.setState({ personsResults: res.results })
        })


    }

    render() {
        return (

            <div>

                <MenuBar />
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Year</label>
                            <FormInput placeholder="Year" value={this.state.YearQuery} onChange={this.handleYearQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Age</label>
                            <FormInput placeholder="Age" value={this.state.AgeQuery} onChange={this.handleAgeQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Sex</label>
                            <FormInput placeholder="Sex" value={this.state.SexQuery} onChange={this.handleSexQueryChange} />
                        </FormGroup></Col>

                    </Row>
                    <br></br>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Race</label>
                            <FormInput placeholder="Race" value={this.state.RaceQuery} onChange={this.handleRaceQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Hispanic</label>
                            <FormInput placeholder="Hispanic" value={this.state.HispanicQuery} onChange={this.handleHispanicQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>If_job_sixmonth</label>
                            <FormInput placeholder="If_job_sixmonth" value={this.state.If_job_sixmonthQuery} onChange={this.handleIf_job_sixmonthQueryChange} />
                        </FormGroup></Col>

                    </Row>
                    <br></br>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Job_specific</label>
                            <FormInput placeholder="Job_specific" value={this.state.Job_specificQuery} onChange={this.handleJob_specificQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Job_type</label>
                            <FormInput placeholder="Job_type" value={this.state.Job_typeQuery} onChange={this.handleJob_typeQueryChange} />
                        </FormGroup></Col>

                    </Row>
                    <br></br>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Times_moved</label>
                            <Slider range defaultValue={[0, 50]} onChange={this.handleTimes_movedQueryChange} />

                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Num_crime</label>
                            <Slider range defaultValue={[0, 50]} onChange={this.handleNum_crimeQueryChange} />

                        </FormGroup></Col>
                        {/* TASK 27: Create a column with a label and slider in a FormGroup item for filtering by Potential. See the column above for reference and use the onChange method (handlePotentialChange)  */}
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>

                    </Row>


                </Form>
                <Divider />
                {/* TASK 24: Copy in the players table from the Home page, but use the following style tag: style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }} - this should be one line of code! */
                <Table dataSource={this.state.personsResults} columns={personColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }} style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}/>}

                <Divider />

                {this.state.selectedPlayerDetails ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <Card>
                    
                        <CardBody>
                        <Row gutter='30' align='middle' justify='left'>
                            <Col>
                            <h5>{this.state.selectedPlayerDetails.Year}</h5>
                            </Col>
                            <Col>
                            <h5>{this.state.selectedPlayerDetails.Age}</h5>
                            </Col>
                            <Col>
                            <h5>{this.state.selectedPlayerDetails.Sex}</h5>
                            </Col>
                        </Row>
                        <Row gutter='30' align='middle' justify='left'>
                            <Col>
                            <h5>{this.state.selectedPlayerDetails.Race}</h5>
                            </Col>
                            <Col>
                            <h5>{this.state.selectedPlayerDetails.Hispanic}</h5>
                            </Col>
                            <Col>
                            <h5>{this.state.selectedPlayerDetails.Times_moved}</h5>
                            </Col>
                        </Row>
                        <br>
                        </br>
                        <Row gutter='30' align='middle' justify='left'>
                            <Col>
                            If_job_sixmonth: {this.state.selectedPlayerDetails.If_job_sixmonth}
                            </Col>
                            <Col>
                            Job_specific: {this.state.selectedPlayerDetails.Job_specific}
                            </Col>
                        </Row>
                        <Row gutter='30' align='middle' justify='left'>
                            <Col>
                            Job_type: {this.state.selectedPlayerDetails.Job_type}
                            </Col>
                            <Col>
                            Num_crime: {this.state.selectedPlayerDetails. Num_crime}
                            </Col>
                        </Row>
                        </CardBody>

                    </Card>

                </div> : null}

            </div>
        )
    }
}

export default PersonsPage

