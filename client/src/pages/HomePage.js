import React from 'react';
import {
  Table,
  Pagination,
  Select
} from 'antd'

import MenuBar from '../components/MenuBar';

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
import { getAllHouseholds, getAllPersons } from '../fetcher'
const { Option } = Select;

const wideFormat = format('.3r');



class HomePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      useCanvas: false
    };
  }



  render() {

    const {useCanvas} = this.state;
    const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;
    const data_Bar_Male = [
      {x: 2003, y: 2819},
      {x: 2004, y: 3501},
      {x: 2005, y: 3104},
      {x: 2006, y: 2770},
      {x: 2007, y: 3989},
      {x: 2008, y: 4077},
      {x: 2009, y: 4147},
      {x: 2010, y: 4354},
      {x: 2011, y: 4114},
      {x: 2012, y: 4783},
      {x: 2013, y: 4661},
      {x: 2014, y: 4256},
      {x: 2015, y: 4226},
      {x: 2016, y: 3609},
      {x: 2017, y: 4962},
      {x: 2018, y: 3545},
    ];
    const data_Bar_Female = [
      {x: 2003, y: 3812},
      {x: 2004, y: 3960},
      {x: 2005, y: 3484},
      {x: 2006, y: 3170},
      {x: 2007, y: 4343},
      {x: 2008, y: 4465},
      {x: 2009, y: 4607},
      {x: 2010, y: 5017},
      {x: 2011, y: 4881},
      {x: 2012, y: 5706},
      {x: 2013, y: 5436},
      {x: 2014, y: 4981},
      {x: 2015, y: 4828},
      {x: 2016, y: 4408},
      {x: 2017, y: 5715},
      {x: 2018, y: 3545},
    ];



    return (
      <div>
        <MenuBar />
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h1>Home</h1>
        </div>
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
        <p>
        The NCVS contains personal crime data with details about the crime including time,
location, victim relationship, various characteristics of the offender, and other reported details
from the victim. The incident dataset is associated with a household dataset and a person
dataset, providing more insights about the background of the offender. The NCVS household
and person datasets are created through interviewing a total of seven times over three years
and random monthly sampling of households by U.S. Census Bureau. Overall each dataset
has 400-1200 columns, we are picking out the important and interesting variables in each
dataset for this project’s sake.
        </p>
        </div>
        <div class="row">
          <div class="col-md-8 mx-auto">
            <h3>Number of Crime Reports by Sex</h3>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8 mx-auto">
            <DiscreteColorLegend
                style={{position: 'absolute', left: '50px', top: '10px'}}
                orientation="horizontal"
                items={[
                  {
                    title: 'Females',
                    color: '#12939A'
                  },
                  {
                    title: 'Males',
                    color: '#79C7E3'
                  }
                ]}
              />
            <FlexibleXYPlot width={700} height={400} stackBy="y" xDomain={[2003, 2018]} yDomain={[0, 11000]}>
              <XAxis title = "Year"/>
              <YAxis tickValues={[0,2000, 4000, 6000, 8000, 10000,12000]}/>
              <HorizontalGridLines />
              <VerticalGridLines />
              <BarSeries data={data_Bar_Female} color="#12939A"/>
              <BarSeries data={data_Bar_Male} color="#79C7E3"/>
              
            </FlexibleXYPlot>
          </div>
      </div>
      <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
       
      </div>

      </div>
    )
  }

}

export default HomePage

