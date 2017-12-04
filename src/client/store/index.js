import { observable, action, toJS } from 'mobx';

var appState = observable({
	loading: false,
    isAuthenticated: false,
    labels: [],
    accessToken: null,
});

appState.authenticate = action((val) => {
    appState.isAuthenticated = val;
});

appState.showLoader = action(() => {
	console.log("showLoader", appState.loading)
	appState.loading = true;
})

appState.hideLoader = action(() => {
	console.log("hideloader", appState.loading)
	console.log("isAuthenticated", appState.isAuthenticated)
	appState.loading = false;
})

appState.setLabels = action((labels) => {
	let authenticated = false;

	appState.labels = labels;
	appState.accessToken = labels.accessToken;
	authenticated = true;

	appState.authenticate(authenticated);
})

appState.getLabels = () => {
	console.log(toJS(appState.labels));
	return toJS(appState.labels);
};

export default appState;