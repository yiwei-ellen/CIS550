import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";
import Plot from 'react-plotly.js';
import {
    Table,
    Pagination,
    Select,
    Input,
    Row,
    Col
} from 'antd'
import { format } from 'd3-format';

import MenuBar from '../components/MenuBar';
import { relJobVictim, } from '../fetcher'
//const { Option } = Select;




class PcrimePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            jobResults: [],
            value:"disabled"

        }

        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.implementGraph = this.implementGraph.bind(this)
    }

    implementGraph(){


    }
    updateSearchResults() {
 
        if (this.state.value =='job'){
            alert("called job")
            relJobVictim().then(res => {
                this.setState({ personsResults: res.results })
            })
        } else if (this.state.value =='sex'){

        } else if (this.state.value =='race'){

        }
        
        //TASK 23: call getPlayerSearch and update playerResults in state. See componentDidMount() for a hint
    }

    componentDidMount() {
        relJobVictim().then(res => {
            this.setState({ jobResults: res.results })
        })
    }
    handleChange(event) {
        this.setState({value: event.target.value})
    }

    handleSubmit(event) {
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
        this.updateSearchResults();
        
    }
    render() {
        return (

            <div>

                <MenuBar />
                <div style={{ width: '80vw', margin: '0 auto', marginTop: '8vh' }}>
                <Row>
                <Form  onSubmit={this.handleSubmit}>
                        <h4>Pick your inquiry: </h4>
                        <Col span={12}> <select type="primary" defaultValue ="disabled" value={this.state.value} onChange={this.handleChange}>
                            <option value="race">Race</option>
                            <option value="sex">Sex</option>
                            <option value="job">Job</option>
                            <option value="disabled" disabled> default</option>
                        </select></Col>
                        <Col span={12} style={{ marginTop: '2vh' }}> <Input type="submit" value="Submit" /></Col>
                </Form>
                
                </Row>
                        
                    
                </div>
                


            </div>
        )
    }
}

export default PcrimePage