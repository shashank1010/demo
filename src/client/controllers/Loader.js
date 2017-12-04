import React, { Component } from "react";
import {observer} from 'mobx-react';
import appState from "../store/index.js";

import AppLoader from "__CLIENT/views/Loader";


@observer class Loader extends Component {
	render() {
		return <AppLoader loading={appState.loading} />
	}
}

export default Loader;