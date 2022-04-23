import React from 'react';
import Plot from 'react-plotly.js';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";


import {
    Table,
    Pagination,
    Row,
    Col,
    Divider,

} from 'antd'

import { getVisualization1 } from '../fetcher'


import MenuBar from '../components/MenuBar';

const { Column, ColumnGroup } = Table;


class VisualizationPage extends React.Component {
    constructor(props) {
        super(props)
        //initial states setup
        this.state = {
            visualization1Results: []

        }

    }

    componentDidMount() {
        getVisualization1().then(res => {
            this.setState({ visualization1Results: res.results })
        })
        
    }


    render() {
        const xValues = this.state.visualization1Results.Income_Bracket;

        var trace1 = {
            x:xValues,
            y: this.state.visualization1Results.Weapon_involved,
            name: 'weapon involved',
            type: 'bar'
        } ;

        var trace2 = {
            x:xValues,
            y: this.state.visualization1Results.No_weapon_involved,
            name: 'No weapon involved',
            type: 'bar'
        };

        var trace3 = {
            x:xValues,
            y: this.state.visualization1Results.Do_not_know,
            name: 'Do_not_know',
            type: 'bar'
        };

        var trace4 = {
            x: xValues,
            y: this.state.visualization1Results.Do_not_know,
            name: 'Do_not_know',
            type: 'bar'
        };

        var data = [trace1, trace2, trace3, trace4];

        var layout = {barmode: 'stack'};

        Plot.newPlot('myDiv', data, layout);

        return (
            <div>
                <div id="myDiv" style="width:100%;max-width:700px"></div>
            </div>
        )
    }
}

export default VisualizationPage

