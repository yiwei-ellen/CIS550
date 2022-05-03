import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import PersonsPage from './pages/PersonsPage';
import VisualizationPage from './pages/Visualization';
import PcrimePage from './pages/Pcrime';
import HcrimePage from './pages/Hcrime';
import 'antd/dist/antd.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import HouseholdPage from './pages/HouseholdPage';

ReactDOM.render(
  <div>
    <Router>
      <Switch>
        <Route exact
							path="/"
							render={() => (
								<HomePage />
							)}/>
        <Route exact
							path="/persons"
							render={() => (
								<PersonsPage />
							)}/>
        <Route exact
							path="/households"
							render={() => (
								<HouseholdPage />
							)}/>
		<Route exact
							path="/visuals"
							render={() => (
								<VisualizationPage />
							)}/>
		<Route exact
							path="/personcrime"
							render={() => (
								<PcrimePage />
							)}/>
		<Route exact
							path="/householdcrime"
							render={() => (
								<HcrimePage />
							)}/>

      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);

