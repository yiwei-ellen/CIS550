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
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Year</label>
                            <FormInput placeholder="Year" value={this.state.YearQuery} onChange={this.handleYearQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Land_use_OG</label>
                            <FormInput placeholder="Land_use_OG" value={this.state.Land_use_OGQuery} onChange={this.handleLand_use_OGQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Land_use_2015</label>
                            <FormInput placeholder="Land_use_2015" value={this.state.Land_use_2015Query} onChange={this.handleLand_use_2015QueryChange} />
                        </FormGroup></Col>

                    </Row>
                    <br></br>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Living_quarter_OG</label>
                            <FormInput placeholder="Living_quarter_OG" value={this.state.Living_quarter_OGQuery} onChange={this.handleLiving_quarter_OGQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Living_quarter_2016</label>
                            <FormInput placeholder="Living_quarter_2016" value={this.state.Living_quarter_2016Query} onChange={this.handleLiving_quarter_2016QueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Income</label>
                            <FormInput placeholder="Income" value={this.state.IncomeQuery} onChange={this.handleIncomeQueryChange} />
                        </FormGroup></Col>

                    </Row>
                    <br></br>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Income_2015</label>
                            <FormInput placeholder="Income_2015" value={this.state.Income_2015Query} onChange={this.handleIncome_2015QueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Head_race</label>
                            <FormInput placeholder="Head_race" value={this.state.Head_raceQuery} onChange={this.handleHead_raceQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Head_hispanic</label>
                            <FormInput placeholder="Head_hispanic" value={this.state.Head_hispanicQuery} onChange={this.handleHead_hispanicQueryChange} />
                        </FormGroup></Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Num_crime_reported</label>
                            <Slider range defaultValue={[0, 50]} onChange={this.handleNum_crime_reportedQueryChange} />

                        </FormGroup></Col>
                        {/* TASK 27: Create a column with a label and slider in a FormGroup item for filtering by Potential. See the column above for reference and use the onChange method (handlePotentialChange)  */}
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
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

