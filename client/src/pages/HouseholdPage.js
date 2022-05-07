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
        title: 'Land_use_OG',
        dataIndex: 'Land_use_OG',
        key: 'Land_use_OG',
        sorter: (a, b) => a.Land_use_OG.localeCompare(b.Land_use_OG)
    },
    {
        title: 'Land_use_2015',
        dataIndex: 'Land_use_2015',
        key: 'Land_use_2015',
        sorter: (a, b) => a.Land_use_2015.localeCompare(b.Land_use_2015)
    },
    {
        title: 'Living_quarter_OG',
        dataIndex: 'Living_quarter_OG',
        key: 'Living_quarter_OG',
        sorter: (a, b) => a.Living_quarter_OG.localeCompare(b.Living_quarter_OG)
    },
    {
        title: 'Living_quarter_2016',
        dataIndex: 'Living_quarter_2016',
        key: 'Living_quarter_2016',
        sorter: (a, b) => a.Living_quarter_2016.localeCompare(b.Living_quarter_2016)
    },
    {
        title: 'Income',
        dataIndex: 'Income',
        key: 'Income',
        sorter: (a, b) => a.Income.localeCompare(b.Income)
    },
    {
        title: 'Income_2015',
        dataIndex: 'Income_2015',
        key: 'Income_2015',
        sorter: (a, b) => a.Income_2015.localeCompare(b.Income_2015)
    },
    {
        title: 'Num_crime_reported',
        dataIndex: 'Num_crime_reported',
        key: 'Num_crime_reported',
        sorter: (a, b) => a.Num_crime_reported.localeCompare(b.Num_crime_reported)
    },
    {
        title: 'Head_race',
        dataIndex: 'Head_race',
        key: 'Head_race',
        sorter: (a, b) => a.Head_race.localeCompare(b.Head_race)
    },
    {
        title: 'Head_hispanic',
        dataIndex: 'Head_hispanic',
        key: 'Head_hispanic',
        sorter: (a, b) => a.Head_hispanic.localeCompare(b.Head_hispanic)
    },
    // TASK 19: copy over your answers for tasks 7 - 9 to add columns for potential, club, and value
];


class HouseholdPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            YearQuery: 2015,
            Land_use_OGQuery: "",
            Land_use_2015Query: "",
            Living_quarter_OGQuery: "",
            Living_quarter_2016Query: "",
            IncomeQuery: "",
            Income_2015Query: "",
            Num_crime_reported_lowQuery: 0,
            Num_crime_reported_highQuery: 5,
            Head_raceQuery: "",
            Head_hispanicQuery: "",
            householdResults: [],
            selectedHouseholdDetails: null

        }

        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.handleYearQueryChange = this.handleYearQueryChange.bind(this)
        this.handleLand_use_OGQueryChange = this.handleLand_use_OGQueryChange.bind(this)
        this.handleLand_use_2015QueryChange = this.handleLand_use_2015QueryChange.bind(this)
        this.handleLiving_quarter_OGQueryChange = this.handleLiving_quarter_OGQueryChange.bind(this)
        this.handleLiving_quarter_2016QueryChange = this.handleLiving_quarter_2016QueryChange.bind(this)
        this.handleIncomeQueryChange = this.handleIncomeQueryChange.bind(this)
        this.handleIncome_2015QueryChange = this.handleIncome_2015QueryChange.bind(this)
        this.handleNum_crime_reportedQueryChange = this.handleNum_crime_reportedQueryChange.bind(this)
        this.handleHead_raceQueryChange = this.handleHead_raceQueryChange.bind(this)
        this.handleHead_hispanicQueryChange = this.handleHead_hispanicQueryChange.bind(this)

    }



    handleYearQueryChange(event) {
        this.setState({ YearQuery: event.target.value })
    }

    handleLand_use_OGQueryChange(event) {
        this.setState({ Land_use_OGQuery: event.target.value })
    }

    handleLand_use_2015QueryChange(event) {
        this.setState({ Land_use_2015Query: event.target.value })
    }

    handleLiving_quarter_OGQueryChange(event) {
        this.setState({ Living_quarter_OGQuery: event.target.value })
    }

    handleLiving_quarter_2016QueryChange(event) {
        this.setState({ Living_quarter_2016Query: event.target.value })
    }

    handleIncomeQueryChange(event) {
        this.setState({ IncomeQuery: event.target.value })
    }

    handleIncome_2015QueryChange(event) {
        this.setState({ Income_2015Query: event.target.value })
    }

    handleNum_crime_reportedQueryChange(value) {
        this.setState({ Num_crime_reported_lowQuery: value[0] })
        this.setState({ Num_crime_reported_highQuery: value[1] })
    }

    handleHead_raceQueryChange(event) {
        this.setState({ Head_raceQuery: event.target.value })
    }

    handleHead_hispanicQueryChange(event) {
        this.setState({ Head_hispanicQuery: event.target.value })
    }


    updateSearchResults() {
        //TASK 11: call getyHouseholdSearch and update matchesResults in state. See componentDidMount() for a hint
        getHouseholdSearch(this.state.YearQuery, this.state.Land_use_OGQuery, this.state.Land_use_2015Query,
            this.state.Living_quarter_OGQuery, this.Living_quarter_2016Query, this.state.IncomeQuery,
            this.state.Income_2015Query, this.state.Num_crime_reported_lowQuery, this.state.Num_crime_reported_highQuery,
            this.state.Head_raceQuery, this.state.Head_hispanicQuery,
            1, 10).then(res => {
            this.setState({ householdResults: res.results })
        })
    }

    componentDidMount() {
        getHouseholdSearch(this.state.YearQuery, this.state.Land_use_OGQuery, this.state.Land_use_2015Query,
            this.state.Living_quarter_OGQuery, this.Living_quarter_2016Query, this.state.IncomeQuery,
            this.state.Income_2015Query, this.state.Num_crime_reported_lowQuery, this.state.Num_crime_reported_highQuery,
            this.state.Head_raceQuery, this.state.Head_hispanicQuery,
            1, 10).then(res => {
            this.setState({ householdResults: res.results })
        })
        console.log(this.state.householdResults)        
    }

    render() {
        return (
            <div>
                
                <MenuBar />
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col span={8}>
                            <label>Year</label>
                            <FormGroup style={{ width: '15vw' }}>
                            
                            <FormInput placeholder="Year" value={this.state.YearQuery} onChange={this.handleYearQueryChange} />
                        </FormGroup></Col>
                        
                         
                        <Col span={8}>
                        <label>Land_use_OG</label>
                        <Form >
                             <select type="primary" defaultValue ="Urban" value={this.state.Land_use_OGQuery} onChange={this.handleLand_use_OGQueryChange}>
                            <option value="Urban">Urban</option>
                            <option value="Rural">Rural</option>
                            <option value="Residue">Residue</option>
                            <option value="Out of universe">Out of universe</option>
                            
                        </select>
                        </Form></Col>
                        <br></br>
                        <Col span={8}> 
                        <label>Living_quarter_OG</label>
                        <Form >
                        <select type="primary" defaultValue ="House, apartment, flat" value={this.state.Living_quarter_OGQuery} onChange={this.handleLiving_quarter_OGQueryChange}>
                            <option value="House, apartment, flat">House, apartment, flat</option>
                            <option value="Mobile home or trailer with no permanent room added">Mobile home or trailer with no permanent room added</option>
                            <option value="Mobile home or trailer with one or more permanent rooms added">Mobile home or trailer with one or more permanent rooms added</option>
                            <option value="Other unit not specified above">Other unit not specified above</option>
                            <option value="Student quarters in college dormitory">Student quarters in college dormitory</option>
                            <option value="Unoccupied site for mobile home, trailer, or tent">Unoccupied site for mobile home, trailer, or tent</option>
                            <option value="Housing unit not specified above">Housing unit not specified above</option>
                            <option value="Housing unit in rooming house">Housing unit in rooming house</option>
                            <option value="Quarters not housing unit in rooming or boarding house">Quarters not housing unit in rooming or boarding house</option>
                            <option value="Housing unit in nontransient hotel, motel, etc.">Housing unit in nontransient hotel, motel, etc.</option>
                            <option value="Housing unit permanent in transient hotel, motel, etc.">Housing unit permanent in transient hotel, motel, etc.</option>
                            <option value="Unit not permanent in transient hotel, motel, etc.">Unit not permanent in transient hotel, motel, etc.</option>
                            <option value="Invalid">Invalid</option>
                            <option value="Residue">Residue</option>
                            <option value="Out of universe">Out of universe</option>
                        </select>
                        </Form></Col>
                        
                    </Row>
                    <br></br>
                    <Row>
                        
                    <Col span={8}>
                        <label>Land_use_2015</label>
                        <Form >
                             <select type="primary" defaultValue ="Urban" value={this.state.Land_use_2015Query} onChange={this.handleLand_use_2015QueryChange}>
                            <option value="Urban">Urban</option>
                            <option value="Rural">Rural</option>
                            <option value="Out of universe">Out of universe</option>
                        </select>
                        </Form></Col>

                        
                        <Col span={8}>
                        <label>Income</label>
                        <Form >
                             <select type="primary" defaultValue ="Less than $5,000" value={this.state.IncomeQuery} onChange={this.handleIncomeQueryChange}>
                            <option value="Less than $5,000">Less than $5,000</option>
                            <option value="$5,000 to $7,499">$5,000 to $7,499</option>
                            <option value="$7,500 to $9,999">$7,500 to $9,999</option>
                            <option value="$10,000 to $12,499">$10,000 to $12,499</option>
                            <option value="$12,500 to $14,999">$12,500 to $14,999</option>
                            <option value="$15,000 to $17,499">$15,000 to $17,499</option>
                            <option value="$17,500 to $19,999">$17,500 to $19,999</option>
                            <option value="$20,000 to $24,999">$20,000 to $24,999</option>
                            <option value="$25,000 to $29,999">$25,000 to $29,999</option>
                            <option value="$30,000 to $34,999">$30,000 to $34,999</option>
                            <option value="$35,000 to $39,999">$35,000 to $39,999</option>
                            <option value="$40,000 to $49,999">$40,000 to $49,999</option>
                            <option value="$50,000 to $74,999">$50,000 to $74,999</option>
                            <option value="$75,000 and over">$75,000 and over</option>
                            <option value="$75,000 to $99,999">$75,000 to $99,999</option>
                            <option value="$100,000-$149,999">$100,000-$149,999</option>
                            <option value="$150,000-$199,999">$150,000-$199,999</option>
                            <option value="$200,000 or more">$200,000 or more</option>
                            <option value="Residue">Residue</option>
                            <option value="Out of universe">Out of universe</option>
                        </select>
                        </Form></Col>
                        <Col span={8}>
                    <label>Income_2015</label>
                    <Form > 
                         <select type="primary" defaultValue ="Less than $5,000" value={this.state.Income_2015Query} onChange={this.handleIncome_2015QueryChange}>
                            <option value="Less than $5,000">Less than $5,000</option>
                            <option value="$5,000 to $7,499">$5,000 to $7,499</option>
                            <option value="$7,500 to $9,999">$7,500 to $9,999</option>
                            <option value="$10,000 to $12,499">$10,000 to $12,499</option>
                            <option value="$12,500 to $14,999">$12,500 to $14,999</option>
                            <option value="$15,000 to $17,499">$15,000 to $17,499</option>
                            <option value="$17,500 to $19,999">$17,500 to $19,999</option>
                            <option value="$20,000 to $24,999">$20,000 to $24,999</option>
                            <option value="$25,000 to $29,999">$25,000 to $29,999</option>
                            <option value="$30,000 to $34,999">$30,000 to $34,999</option>
                            <option value="$35,000 to $39,999">$35,000 to $39,999</option>
                            <option value="$40,000 to $49,999">$40,000 to $49,999</option>
                            <option value="$50,000 to $74,999">$50,000 to $74,999</option>
                            <option value="$75,000 and over">$75,000 and over</option>
                            <option value="$75,000 to $99,999">$75,000 to $99,999</option>
                            <option value="$100,000-$149,999">$100,000-$149,999</option>
                            <option value="$150,000-$199,999">$150,000-$199,999</option>
                            <option value="$200,000 or more">$200,000 or more</option>
                            <option value="Blank">Blank</option>
                            <option value="Invalid until 2015 Q1">Invalid until 2015 Q1</option>
                           
                        </select>
                        </Form></Col>
                    </Row>
                    <br></br>
                    <Row>
                    
                        <Col span={8}>
                        <label>Head_Race</label>
                        <Form >
                          
                        <select type="primary" defaultValue ="White only" value={this.state.Head_raceQuery} onChange={this.handleHead_raceQueryChange}>
                            <option value="White only">White only</option>
                            <option value="Black only">Black only</option>
                            <option value="American Indian, Alaska native only">American Indian, Alaska native only</option>
                            <option value="White-Black">White-Black</option>
                            <option value="Asian only">Asian only</option>
                            <option value="Hawaiian/Pacific Islander only">Hawaiian/Pacific Islander only</option>
                            <option value="White-American Indian">White-American Indian</option>     
                            <option value="White-Hawaiian/Pacific Islander">White-Hawaiian/Pacific Islander</option>
                            <option value="Black-American Indian">Black-American Indian</option>
                            <option value="White-Asian">White-Asian</option>
                            <option value="White-Black-American Indian">White-Black-American Indian</option>
                            <option value="Black-Asian">Black-Asian</option>
                            <option value="Asian-Hawaiian/Pacific Islander">Asian-Hawaiian/Pacific Islander</option>
                            <option value="4 or 5 races">4 or 5 races</option>
                            <option value="Black-Hawaiian/Pacific Islander">Black-Hawaiian/Pacific Islander</option>
                            <option value="White-Black-Asian">White-Black-Asian</option>
                            <option value="2 or 3 races">2 or 3 races</option>
                            <option value="Out of universe">Out of universe</option>
                        </select>
                        </Form></Col>
                        <Col span={8}>
                        <label>Num_crime_reported</label>
                            <FormGroup style={{ width: '20vw'}}>
                            
                            <Slider range defaultValue={[0, 50]} onChange={this.handleNum_crime_reportedQueryChange} />

                        </FormGroup></Col>
                    </Row>
                    <br></br>
                    <Row>
                        
                       
                        <Col span={12}><FormGroup style={{ width: '20vw' }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>

                    </Row>
                </Form>

                <Divider />
                {/* TASK 24: Copy in the players table from the Home page, but use the following style tag: style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }} - this should be one line of code! */
                <Table dataSource={this.state.householdResults} columns={householdColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }} style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}/>}
                <Divider />


                {this.state.selectedHouseholdDetails ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <Card>
                    
                        <CardBody>
                        <Row gutter='30' align='middle' justify='left'>
                            <Col>
                            <h5>{this.state.selectedHouseholdDetails.Yearx}</h5>
                            </Col>
                            <Col>
                            <h5>{this.state.selectedHouseholdDetails.Land_use_OG}</h5>
                            </Col>
                            <Col>
                            <h5>{this.state.selectedHouseholdDetails.Land_use_2015}</h5>
                            </Col>
                        </Row>
                        <Row gutter='30' align='middle' justify='left'>
                            <Col>
                            <h5>{this.state.selectedHouseholdDetails.Living_quarter_OG}</h5>
                            </Col>
                            <Col>
                            <h5>{this.state.selectedHouseholdDetails.Living_quarter_2016}</h5>
                            </Col>
                            <Col>
                            <h5>{this.state.selectedHouseholdDetails.Income}</h5>
                            </Col>
                        </Row>
                        <br>
                        </br>
                        <Row gutter='30' align='middle' justify='left'>
                            <Col>
                            {this.state.selectedHouseholdDetails.Income_2015}
                            </Col>
                            <Col>
                            {this.state.selectedHouseholdDetails.Num_crime_reported}
                            </Col>
                        </Row>
                        <Row gutter='30' align='middle' justify='left'>
                            <Col>
                            {this.state.selectedHouseholdDetails.Head_race}
                            </Col>
                            <Col>
                            {this.state.selectedHouseholdDetails.Head_hispanic}
                            </Col>
                        </Row>
                        </CardBody>

                    </Card>
                
                    </div> : null}

            </div>
        )
    }
}

export default HouseholdPage

