import React from 'react';
import {observer} from 'mobx-react';
import appState from "./store/index.js";

import GoogleAPIs from "__CLIENT/models/GoogleAPI";

import AppContainer from "__CLIENT/views/App";

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			authURL: "",
		};
	}

	componentDidMount() {
		appState.showLoader();
			GoogleAPIs.authCheck()
			.then((res) => {
				if(res.data.authorized){
					return GoogleAPIs.getLabels();
				} else {
					return GoogleAPIs.getURL();
				}
			})
			.then((res) => {
				if(res.data.labels){
					appState.setLabels(res.data.labels);
					appState.hideLoader();
				} else {
					this.setState({
						authURL: res.data.url
					}, () => {
						appState.hideLoader();
					})
				}
			})
			.catch((err) => {
				console.log(err.response);
			})
	}

	submitAccessCode(code) {
		GoogleAPIs.validateAuth({code})
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err.response);
			})
	}

	render() {
		return <AppContainer
			authURL={this.state.authURL}
			submitAccessCode={(code) => { this.submitAccessCode(code)} }
		/>;
	}
}

export default App;