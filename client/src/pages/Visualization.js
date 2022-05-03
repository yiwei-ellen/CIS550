import React from 'react';
import Plot from 'react-plotly.js';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";


import {
    FlexibleXYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalBarSeries,
    VerticalBarSeriesCanvas,
    DiscreteColorLegend
  } from 'react-vis';

import { format } from 'd3-format';


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
const wideFormat = format('.3r');


class VisualizationPage extends React.Component {
    constructor(props) {
        super(props)
        //initial states setup
        this.state = {
            useCanvas : false,
            visualization1Results: []

        }

    }

    componentDidMount() {
        getVisualization1().then(res => {
            this.setState({ visualization1Results: res.results })
        })
        
    }


    render() {

        const {useCanvas} = this.state;
        const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;
        var array = [];
        for (const item in this.state.visualization1Results) {
            console.log(item);
            array.push(item.Income_bracket);
        }
        var xValues = array;

        var array2 = [];
        for (const item in this.state.visualization1Results) {
            array2.push(item.Weapon_involved);
        }
        var t1 = array2;

        var array3 = [];
        for (const item in this.state.visualization1Results) {
            array3.push(item.No_weapon_involved);
        }
        var t2 = array3;

        var array4 = [];
        for (const item in this.state.visualization1Results) {
            array4.push(item.Do_not_know);
        }
        var t3 = array4;

        var array5 = [];
        for (const item in this.state.visualization1Results) {
            array5.push(item.Other);
        }
        var t4 = array5;

        var trace1 = {
            x:xValues,
            y: t1,
            name: 'weapon involved',
            type: 'bar'
        } ;

        var trace2 = {
            x:xValues,
            y: t2,
            name: 'No weapon involved',
            type: 'bar'
        };

        var trace3 = {
            x:xValues,
            y: t3,
            name: 'Do_not_know',
            type: 'bar'
        };

        var trace4 = {
            x: xValues,
            y: t4,
            name: 'Other',
            type: 'bar'
        };

        // var data = [trace1, trace2, trace3, trace4];

        // var layout = {barmode: 'stack'};

        // Plot.newPlot('myDiv', data, layout);
        console.log(xValues);

        return (
            <Plot
                data={[ trace1, trace2, trace3, trace4
                ]}
                layout={ {width: 700, height: 400, title: 'A Fancy Plot', barmode: "stack", yaxis: {automargin: true} }}
          />
        )
    }
}

export default VisualizationPage

