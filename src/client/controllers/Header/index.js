import React from 'react';
import { observer } from 'mobx-react';
import _ from "lodash";

import appState from "__CLIENT/store/index.js";

import AppHeader from "__CLIENT/views/Header";

@observer class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			accessToken: "",
			showForm: false
		}
	}

	componentWillUpdate (nextProps) {
		this.props = nextProps;
	}

	PopUpAuthWindow () {
		this.PopUpWindow = window.open(this.props.authURL, _.uniqueId("_popUp"));

		if(!this.PopUpWindow){
			return alert("Allow Popups");
		}
		
		this.setState({showForm: true});
	}

	changeVal (val) {
		this.setState({accessToken: val})
	}

	resetForm () {
		this.setState({
			accessToken: "",
			showForm: false
		});
	}

	render() {
		return <AppHeader
			isAuthenticated={appState.isAuthenticated}
			PopUpAuthWindow={() => this.PopUpAuthWindow()}
			user={appState.user}
			accessToken={this.state.accessToken}
			onChange={(e, { value }) => this.changeVal(value)}
			onSubmit={() => this.props.submitAccessCode(this.state.accessToken)}
			resetForm={() => this.resetForm()}
			showForm={this.state.showForm}
		/>;
	}
}

export default Header;