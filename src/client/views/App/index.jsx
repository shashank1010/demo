import React from "react";
import Header from "__CLIENT/controllers/Header";
import Loader from "__CLIENT/controllers/Loader";
import Labels from "__CLIENT/controllers/Labels";

const AppContainer = (props) => (
	<div className="appContainer">
		<Header authURL={props.authURL} submitAccessCode={(code) => {props.submitAccessCode(code)}} />
		<Labels />
		<Loader />
	</div>
);

export default AppContainer;