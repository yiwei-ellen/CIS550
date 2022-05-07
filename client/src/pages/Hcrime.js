import React from 'react';
import { Form} from "shards-react";
import Plot from 'react-plotly.js';
import {
    Input,
    Row,
    Col
} from 'antd'

import MenuBar from '../components/MenuBar';
import { relLandHouse, relIncomeHouse,relRaceHouse} from '../fetcher'
//const { Option } = Select;




class HcrimePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            personsResults: [],
            value:"disabled",
            xarray:[],
            yarray:[],
            type:"",
            title:''
        }

        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    updateSearchResults() {
 //depending on the option, graph the statistics to be presented 
        if (this.state.value =='land'){
            relLandHouse().then(res => {
                this.setState({ personsResults: res.results });
                console.log(this.state.personsResults.length)
                var arrx = [];
                var arry = [];
                for( var i=0;i< this.state.personsResults.length;i++){
                    arrx.push(this.state.personsResults[i].Land_type);
                    arry.push(this.state.personsResults[i].Avg_cases);
                }
                this.setState({ xarray: arrx });
                this.setState({ yarray: arry });
                this.setState({type:'bar'});
                this.setState({ title: "Average cases reported by people from different living quarters" });
            })
            
        } else if (this.state.value =='income'){
            relIncomeHouse().then(res => {
                this.setState({ personsResults: res.results });
                console.log(this.state.personsResults.length)
                var arrx = [];
                var arry = [];
                for( var i=0;i< this.state.personsResults.length;i++){
                    arrx.push(this.state.personsResults[i].Income);
                    arry.push(this.state.personsResults[i].Avg_cases);
                }
                this.setState({ xarray: arrx });
                this.setState({ yarray: arry });
                this.setState({type:'bar'});
                this.setState({ title: "Avg number of crime reported for each income" });
            })

        } else if (this.state.value =='race'){
            relRaceHouse().then(res => {
                this.setState({ personsResults: res.results });
                console.log(this.state.personsResults.length)
                var arrx = [];
                var arry = [];
                for( var i=0;i< 6;i++){
                    arrx.push(this.state.personsResults[i].Race);
                    arry.push(this.state.personsResults[i].proportion);
                }
                this.setState({ xarray: arrx });
                this.setState({ yarray: arry });
                this.setState({type:'bar'});
                this.setState({ title: "proportion of crime reported for each race" });
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
                            <option value="race">Race of household head</option>
                            <option value="land">Type of living quarter</option>
                            <option value="income">Income bracket</option>
                            <option value="disabled" disabled> default</option>
                        </select></Col>
                        <Col span={12} style={{ marginTop: '2vh' }}> <Input type="submit" value="Submit" /></Col>
                </Form>
                
                </Row>
                <Plot
                data={[ {
                    x:this.state.xarray,
                    y:this.state.yarray,
                    type:this.state.type,
                }]}
                layout={ {width: 800, height: 500, title: this.state.title, yaxis: {automargin: true} }}
                />
                        
                    
                </div>
                


            </div>
        )
    }
}

export default HcrimePage