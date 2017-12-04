import React, { Component } from "react";
import { observer } from "mobx-react";

import appState from "__CLIENT/store";

import AppLabel from "__CLIENT/views/Labels";

@observer class AppLabels extends Component{
	render () {
		const labels = appState.getLabels();
		return <AppLabel isAuthenticated={appState.isAuthenticated} labels={labels} />
	}
}

export default AppLabels;