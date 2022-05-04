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
import MenuBar from '../components/MenuBar';


import {
    Table,
    Pagination,
    Row,
    Col,
    Divider,

} from 'antd'

import { getVisualization1 } from '../fetcher'


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
        console.log(this.state.visualization1Results);

        var xValues = [];
        var t1 = [];
        var t2 = [];
        var t3 = [];
        var t4 = [];
        
        for (var i = 0; i < this.state.visualization1Results.length; i++) {
            var item = this.state.visualization1Results[i];
            xValues.push(item.Income_bracket);
            t1.push(item.Weapon_involved);
            t2.push(item.Weapon_involved);
            t3.push(item.Weapon_involved);
            t4.push(item.Weapon_involved);
        }

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
            <div>
                <MenuBar/>
                <div>
                    <Plot
                        data={[ trace1, trace2, trace3, trace4
                        ]}
                        layout={ {width: 700, height: 400, title: 'A Fancy Plot', barmode: "stack", yaxis: {automargin: true} }}
                />
            </div>
          </div>
        )
    }
}

export default VisualizationPage

