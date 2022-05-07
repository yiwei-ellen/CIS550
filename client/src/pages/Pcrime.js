import React from 'react';
import { Form} from "shards-react";
import Plot from 'react-plotly.js';
import {
    Input,
    Row,
    Col
} from 'antd'

import MenuBar from '../components/MenuBar';
import { relJobVictim, relRaceVictim,relOldVictim} from '../fetcher'
//const { Option } = Select;




class PcrimePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            personsResults: [],
            value:"disabled",
            xarray:[],
            yarray:[],
            title:''
        }

        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    updateSearchResults() {
 //depending on the option, graph the statistics to be presented 
        if (this.state.value =='job'){
            relJobVictim().then(res => {
                this.setState({ personsResults: res.results });
                console.log(this.state.personsResults.length)
                var arrx = [];
                var arry = [];
                for( var i=0;i< this.state.personsResults.length;i++){
                    arrx.push(this.state.personsResults[i].Year);
                    arry.push(this.state.personsResults[i].Proportion);
                }
                this.setState({ xarray: arrx });
                this.setState({ yarray: arry });
                this.setState({ title: "Chance Of Being Victim While No Job" });
            })
            
        } else if (this.state.value =='age'){
            relOldVictim().then(res => {
                this.setState({ personsResults: res.results });
                console.log(this.state.personsResults.length)
                var arrx = [];
                var arry = [];
                for( var i=0;i< this.state.personsResults.length;i++){
                    arrx.push(this.state.personsResults[i].Year);
                    arry.push(this.state.personsResults[i].Proportion);
                }
                this.setState({ xarray: arrx });
                this.setState({ yarray: arry });
                this.setState({ title: "Chance Of Being Victim For Being Elderly (>=65years)" });
            })

        } else if (this.state.value =='race'){
            relRaceVictim().then(res => {
                this.setState({ personsResults: res.results });
                console.log(this.state.personsResults.length)
                var arrx = [];
                var arry = [];
                for( var i=0;i< this.state.personsResults.length;i++){
                    arrx.push(this.state.personsResults[i].Year);
                    arry.push(this.state.personsResults[i].Proportion);
                }
                this.setState({ xarray: arrx });
                this.setState({ yarray: arry });
                this.setState({ title: "Chance Of Being Victim For Being Hispanic" });
            })
        }
        
     
    }

    componentDidMount() {
        //begin with no graph
        this.setState({personsResults: [],arrx:[],arry:[]})
    }
    handleChange(event) {
        this.setState({value: event.target.value})
    }

    handleSubmit(event) {
        //handles the submission
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
                            <option value="race">Hispanic</option>
                            <option value="age">Age</option>
                            <option value="job">Job</option>
                            <option value="disabled" disabled> default</option>
                        </select></Col>
                        <Col span={12} style={{ marginTop: '2vh' }}> <Input type="submit" value="Submit" /></Col>
                </Form>
                
                </Row>
                <Plot
                data={[ {
                    x:this.state.xarray,
                    y:this.state.yarray,
                    type:"scatter"
                }]}
                layout={ {width: 800, height: 500, title: this.state.title, yaxis: {automargin: true} }}
                />
                        
                    
                </div>
                


            </div>
        )
    }
}

export default PcrimePage