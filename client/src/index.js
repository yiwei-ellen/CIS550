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
							path="/visualss"
							render={() => (
								<VisualizationPage />
							)}/>

      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);

