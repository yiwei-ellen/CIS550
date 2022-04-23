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
            nameQuery: '',
            nationalityQuery: '',
            clubQuery: '',
            ratingHighQuery: 100,
            ratingLowQuery: 0,
            potHighQuery: 100,
            potLowQuery: 0,
            selectedPlayerId: window.location.search ? window.location.search.substring(1).split('=')[1] : 229594,
            selectedPlayerDetails: null,
            playersResults: []

        }

        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.handleNameQueryChange = this.handleNameQueryChange.bind(this)
        this.handleNationalityQueryChange = this.handleNationalityQueryChange.bind(this)
        this.handleClubQueryChange = this.handleClubQueryChange.bind(this)
        this.handleRatingChange = this.handleRatingChange.bind(this)
        this.handlePotentialChange = this.handlePotentialChange.bind(this)
    }

    

    handleNameQueryChange(event) {
        this.setState({ nameQuery: event.target.value })
    }

    handleClubQueryChange(event) {
        this.setState({ clubQuery: event.target.value })
        // TASK 20: update state variables appropriately. See handleNameQueryChange(event) for reference
    }

    handleNationalityQueryChange(event) {
        this.setState({ nationalityQuery: event.target.value })
        // TASK 21: update state variables appropriately. See handleNameQueryChange(event) for reference
    }

    handleRatingChange(value) {
        this.setState({ ratingLowQuery: value[0] })
        this.setState({ ratingHighQuery: value[1] })
    }

    handlePotentialChange(value) {
        this.setState({ potLowQuery: value[0] })
        this.setState({ potHighQuery: value[1] })
        // TASK 22: parse value and update state variables appropriately. See handleRatingChange(value) for reference
    }



    updateSearchResults() {
        getPersonsSearch(this.state.nameQuery, this.state.nationalityQuery, this.state.clubQuery, this.state.ratingHighQuery, this.state.ratingLowQuery, this.state.potHighQuery, this.state.potLowQuery, null, null).then(res => {
            this.setState({ playersResults: res.results })
        })
        //TASK 23: call getPlayerSearch and update playerResults in state. See componentDidMount() for a hint

    }

    componentDidMount() {
        getPersonsSearch(this.state.nameQuery, this.state.nationalityQuery, this.state.clubQuery, this.state.ratingHighQuery, this.state.ratingLowQuery, this.state.potHighQuery, this.state.potLowQuery, null, null).then(res => {
            this.setState({ playersResults: res.results })
        })


    }

    render() {
        return (

            <div>

                <MenuBar />
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Name</label>
                            <FormInput placeholder="Name" value={this.state.nameQuery} onChange={this.handleNameQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Nationality</label>
                            <FormInput placeholder="Nationality" value={this.state.nationalityQuery} onChange={this.handleNationalityQueryChange} />
                        </FormGroup></Col>
                        {/* TASK 26: Create a column for Club, using the elements and style we followed in the above two columns. Use the onChange method (handleClubQueryChange)  */}

                    </Row>
                    <br></br>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Rating</label>
                            <Slider range defaultValue={[50, 100]} onChange={this.handleRatingChange} />

                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Potential</label>
                            <Slider range defaultValue={[50, 100]} onChange={this.handlePotentialChange} />

                        </FormGroup></Col>
                        {/* TASK 27: Create a column with a label and slider in a FormGroup item for filtering by Potential. See the column above for reference and use the onChange method (handlePotentialChange)  */}
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>

                    </Row>


                </Form>
                <Divider />
                {/* TASK 24: Copy in the players table from the Home page, but use the following style tag: style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }} - this should be one line of code! */
                <Table dataSource={this.state.playersResults} columns={personColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }} style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}/>}

                <Divider />

                {this.state.selectedPlayerDetails ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <Card>
                    
                        <CardBody>
                        <Row gutter='30' align='middle' justify='center'>
                            <Col flex={2} style={{ textAlign: 'left' }}>
                            <h3>{this.state.selectedPlayerDetails.Name}</h3>

                            </Col>

                            <Col flex={2} style={{ textAlign: 'right' }}>
                            <img src={this.state.selectedPlayerDetails.Photo} referrerpolicy="no-referrer" alt={null} style={{height:'15vh'}}/>

                            </Col>
                        </Row>
                        <Row gutter='30' align='middle' justify='left'>
                            <Col>
                            <h5>{this.state.selectedPlayerDetails.Club}</h5>
                            </Col>
                            <Col>
                            <h5>{this.state.selectedPlayerDetails.JerseyNumber}</h5>
                            </Col>
                            <Col>
                            <h5>{this.state.selectedPlayerDetails.BestPosition}</h5>
                            </Col>
                        </Row>
                        <br>
                        </br>
                        <Row gutter='30' align='middle' justify='left'>
                            <Col>
                            Age: {this.state.selectedPlayerDetails.Age}
                            </Col>
                            <Col>
                            Height: {this.state.selectedPlayerDetails.Height}
                            </Col>
                            <Col>
                            Weight: {this.state.selectedPlayerDetails.Weight}
                            </Col>
                            {/* TASK 28: add two more columns here for Height and Weight, with the appropriate labels as above */}
                            <Col flex={2} style={{ textAlign: 'right' }}>
                            {this.state.selectedPlayerDetails.Nationality}
                                <img src={this.state.selectedPlayerDetails.Flag} referrerpolicy="no-referrer" alt={null} style={{height:'3vh', marginLeft: '1vw'}}/>
                            </Col>
                        </Row>
                            <Row gutter='30' align='middle' justify='left'>
                                <Col>
                                Value: {this.state.selectedPlayerDetails.Value}
                                </Col>
                                <Col>
                                Release Clause: {this.state.selectedPlayerDetails.ReleaseClause}
                                </Col>
                                <Col>
                                Wage: {this.state.selectedPlayerDetails.Wage}
                                </Col>
                                <Col>
                                Contract Valid Until: {this.state.selectedPlayerDetails.ContractValidUntil}
                                </Col>
                                {/* TASK 29: Create 2 additional columns for the attributes 'Wage' and 'Contract Valid Until' (use spaces between the words when labelling!) */}
                            </Row>
                        </CardBody>

                    </Card>

                    <Card style={{marginTop: '2vh'}}>
                        <CardBody>
                            <Row gutter='30' align='middle' justify='center'>
                            <Col flex={2} style={{ textAlign: 'left' }}>
                            <h6>Skill</h6>
                            <Rate disabled defaultValue={this.state.selectedPlayerDetails.Skill} />
                            <h6>Reputation</h6>
                            <Rate disabled defaultValue={this.state.selectedPlayerDetails.InternationalReputation} />
                            {/* TASK 30: create a star rating component for 'InternationalReputation'. Make sure you use the 'disabled' option as above to ensure it is read-only*/}
                            <Divider/>
                            <h6>Best Rating</h6>
                                <Progress style={{ width: '20vw'}} value={this.state.selectedPlayerDetails.BestOverallRating} >{this.state.selectedPlayerDetails.BestOverallRating}</Progress>
                            <h6>Rating</h6>
                                <Progress style={{ width: '20vw'}} value={this.state.selectedPlayerDetails.Rating} >{this.state.selectedPlayerDetails.Rating}</Progress>
                            <h6>Potential</h6>
                                <Progress style={{ width: '20vw'}} value={this.state.selectedPlayerDetails.Potential} >{this.state.selectedPlayerDetails.Potential}</Progress>
                                
                                {/* TASK 31: create the headings and progress bars for 'Potential' and 'Rating'. Use the same style as the one above for 'Best Rating'.*/}
                                </Col >
                                <Col  push={2} flex={2}>
                                {/*TASK 32: In case the player is a GK, show a radar chart (replacing 'null' below) with the labels: Agility, Ball Control, Passing, Positioning, Stamina, Strength */}

                                    {this.state.selectedPlayerDetails.BestPosition === 'GK'?<RadarChart
                                data={[this.state.selectedPlayerDetails]}
                                tickFormat={t => wideFormat(t)}
                                startingAngle={0}
                                domains={[
                                    { name: 'GKPenalties', domain: [0, 100], getValue: d => d.GKPenalties },
                                    { name: 'GKDiving', domain: [0, 100], getValue: d => d.GKDiving },
                                    { name: 'GKKicking', domain: [0, 100], getValue: d => d.GKKicking },
                                    { name: 'GKPositioning', domain: [0, 100], getValue: d => d.GKPositioning },
                                    { name: 'GKReflexes', domain: [0, 100], getValue: d => d.GKReflexes },
                                ]}
                                width={450}
                                height={400}
                                
                            />:<RadarChart
                                data={[this.state.selectedPlayerDetails]}
                                tickFormat={t => wideFormat(t)}
                                startingAngle={0}
                                domains={[
                                    { name: 'Agility', domain: [0, 100], getValue: d => d.NAdjustedAgility },
                                    { name: 'Ball Control', domain: [0, 100], getValue: d => d.NBallControl },
                                    { name: 'Passing', domain: [0, 100], getValue: d => d.NPassing },
                                    { name: 'Positioning', domain: [0, 100], getValue: d => d.NPositioning },
                                    { name: 'Stamina', domain: [0, 100], getValue: d => d.NStamina },
                                    { name: 'Strength', domain: [0, 100], getValue: d => d.NStrength }
                                ]}
                                width={450}
                                height={400}
                                
                            />}
                                
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

