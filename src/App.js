import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";


import NotFound from './NotFound'
import Page from './components/Page'

export default class App extends Component {

	render() {

		return (
			<Router>
				<div>
					<Switch>
						<Route exact path="/" >
							<Page />
						</Route>
						<Route path="/search/*">
							<Page />
						</Route>
						<Route path="*">
							<NotFound />
						</Route>
					</Switch>
				</div>
			</Router >
		)
	}
}
