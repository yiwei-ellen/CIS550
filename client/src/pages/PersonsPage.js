import React from 'react';
import { Form, FormGroup, Button, Card, CardBody, } from "shards-react";
import {
    Table,
    Row,
    Col,
    Divider,
    Slider,
} from 'antd'
import { format } from 'd3-format';
import MenuBar from '../components/MenuBar';
import { getPersonsSearch } from '../fetcher'
const wideFormat = format('.3r');

const personColumns = [
    {
        title: 'Year',
        dataIndex: 'Year',
        key: 'Year',
        sorter: (a, b) => a.Year-b.Year
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
];


class PersonsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Year_lowQuery: 2003,
            Year_highQuery: 2020,
            Age_lowQuery: 0,
            Age_highQuery: 40,
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
//functions in response to user interaction
    handleYearQueryChange(value) {
        this.setState({ Year_lowQuery: value[0] })
        this.setState({ Year_highQuery: value[1] })
    }

    handleAgeQueryChange(value) {
        this.setState({ Age_lowQuery: value[0] })
        this.setState({ Age_highQuery: value[1] })
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
    }



    updateSearchResults() {
        getPersonsSearch(this.state.Year_lowQuery, this.state.Year_highQuery, this.state.Age_lowQuery, this.state.Age_highQuery, this.state.SexQuery, this.state.RaceQuery, this.state.HispanicQuery, 
            this.state.Times_moved_lowQuery, this.state.Times_moved_highQuery, this.state.If_job_sixmonthQuery, 
            this.state.Job_specificQuery, this.state.Job_typeQuery, this.state.Num_crime_lowQuery, 
            this.state.Num_crime_highQuery, 1, 10).then(res => {
            this.setState({ personsResults: res.results })
        })

    }
//initialization
    componentDidMount() {

        getPersonsSearch(this.state.Year_lowQuery, this.state.Year_highQuery,  this.state.Age_lowQuery, this.state.Age_highQuery, this.state.SexQuery, this.state.RaceQuery, this.state.HispanicQuery, 
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
                        <Col span={8}><FormGroup style={{ width: '20vw',  }}>

                            <label>Year</label>
                            <Slider min = {2003} max = {2020} range defaultValue={[2003, 2020]} onChange={this.handleYearQueryChange} />
                        </FormGroup></Col>
                        <Col span={8}><FormGroup style={{ width: '20vw',  }}>
                            <label>Age</label>
                            <Slider range defaultValue={[0, 90]} onChange={this.handleAgeQueryChange} />
                        </FormGroup></Col>
                        <Form>
                        <Col span={8}><label>Gender</label> <select type="primary" defaultValue ="Male" value={this.state.GenderQuery} onChange={this.handleSexQueryChange}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            
                        </select></Col>
                        </Form>
                    </Row>
                    <br></br>
                    <Row> 
                        
                        <Col span={8} > 
                        <label>Race</label>
                            <Form style={{ width: '20vw' }}>
                                <select type="primary" defaultValue ="White only" value={this.state.RaceQuery} onChange={this.handleRaceQueryChange}>
                                    <option value="White only">White only</option>
                                    <option value="Black only">Black only</option>
                                    <option value="American Indian, Alaska native only">American Indian, Alaska native only</option>
                                    <option value="White-Black">White-Black</option>
                                    <option value="Asian only">Asian only</option>
                                    <option value="Hawaiian/Pacific Islander only">Hawaiian/Pacific Islander only</option>
                                    <option value="White-American Indian">White-American Indian</option>
                                    <option value="White-Hawaiian">White-Hawaiian</option>
                                    <option value="Black-American Indian">Black-American Indian</option>
                                    <option value="White-Asian-Hawaiian">White-Asian-Hawaiian</option>
                                    <option value="White-Asian">White-Asian</option>
                                    <option value="White-Black-American Indian">White-Black-American Indian</option>
                                    <option value="Black-Asian">Black-Asian</option>
                                    <option value="Asian-Hawaiian/Pacific Islander">Asian-Hawaiian/Pacific Islander</option>
                                    <option value="4 or 5 races">4 or 5 races</option>
                                    <option value="Black-Hawaiian/Pacific Islander">Black-Hawaiian/Pacific Islander</option>
                                    <option value="White-Black-Asian">White-Black-Asian</option>
                                    <option value="2 or 3 races">2 or 3 races</option>
                                    <option value="White-American Indian-Asian">White-American Indian-Asian</option>
                                    <option value="American Indian-Asian">American Indian-Asian</option>
                                </select>
                            </Form>
                        </Col>
                        
                        <Col span={8}>
                            <label>Hispanic</label>
                            <Form style={{ width: '20vw' }}>
                                <select type="primary" defaultValue ="No" value={this.state.HispanicQuery} onChange={this.handleHispanicQueryChange}>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="Residue">Residue</option>
                                </select>
                            </Form>
                        </Col>
                        
                        <Col span={8}> 
                        <label>If_job_sixmonth</label>
                        <Form style={{ width: '20vw'}}>
                            <select type="primary" defaultValue ="No" value={this.state.If_job_sixmonthQuery} onChange={this.handleIf_job_sixmonthQueryChange}>
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                                <option value="Residue">Residue</option>
                                <option value="Residue">Out of universe</option>
                            </select>
                        </Form>
                        </Col>
                        
                    </Row>
                    <br></br>
                    <Row>
                        
                            
                        <Col span={8}> 
                        <Form style={{ width: '20vw' }}>
                        <label>Job_specific</label>
                            <select type="primary" defaultValue ="Something Else" value={this.state.Job_specificQuery} onChange={this.handleJob_specificQueryChange}>
                            <option value="Something Else">Something Else</option>
                            <option value="Other">Other</option>
                            <option value="Elementary">Elementary</option>
                            <option value="College or university">College or university</option>
                            <option value="High School">High School</option>
                            <option value="Professional (Social worker/psychiatrist)">Professional (Social worker/psychiatrist)</option>
                            <option value="Security guard">Security guard</option>
                            <option value="Nurse">Nurse</option>
                            <option value="Physician">Physician</option>
                            <option value="Junior high or middle school">Junior high or middle school</option>
                            <option value="Preschool">Preschool</option>
                            <option value="Law enforcement officer">Law enforcement officer</option>
                            <option value="Technician">Technician</option>
                            <option value="Technical or industrial school">Technical or industrial school</option>
                            <option value="Taxi cab driver">Taxi cab driver</option>
                            <option value="Bartender">Bartender</option>
                            <option value="Prison or jail guard">Prison or jail guard</option>
                            <option value="Gas station attendant">Gas station attendant</option>
                            <option value="Bus driver">Bus driver</option>
                            <option value="Convenience or liquor store clerk">Convenience or liquor store clerk</option>
                            <option value="Custodial care">Custodial care</option>
                            <option value="Special education facility">Special education facility</option>
                            <option value="Residue">Residue</option>
                            <option value="Out of universe">Out of universe</option>
                        </select>
                        </Form></Col>
                        <Col span={8}>
                            <label>Job_type</label>
                            <Form>
                                <select type="primary" defaultValue ="A private company, business, or individual for wages" value={this.state.Job_typeQuery} onChange={this.handleJob_typeQueryChange}>
                                    <option value="A private company, business, or individual for wages">A private company, business, or individual for wages</option>
                                    <option value="Yourself, (Self-employed) in your own business, professional practice, or farm">Yourself, (Self-employed) in your own business, professional practice, or farm</option>
                                    <option value="The Federal government">The Federal government</option>
                                    <option value="A State, county, or local government">A State, county, or local government</option>
                                    <option value="Residue">Residue</option>
                                    <option value="Out of universe">Out of universe</option>
                                </select>
                            </Form>
                        </Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col span={8}><label>Times_moved</label>
                            <FormGroup style={{ width: '20vw' }}>
                            
                            <Slider range defaultValue={[0, 10]} max ={20} onChange={this.handleTimes_movedQueryChange} />

                        </FormGroup></Col>
                        <Col span={8}>
                            <label>Num_crime</label>
                            <FormGroup style={{ width: '20vw'}}>
                            <Slider range defaultValue={[0, 10]} max ={10}onChange={this.handleNum_crimeQueryChange} />

                        </FormGroup></Col>
                        
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>

                    </Row>


                </Form>
                <Divider />
                {
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

