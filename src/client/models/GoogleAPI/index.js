import axios from "axios";

const GoogleAPIs = () => {
	const authCheck = () => {
		return axios.get(`/api/login`);
	}

	const getURL = () => {
		return axios.get(`/api/generateURL`);
	}

	const validateAuth = (code) => {
		return axios.post(`/api/login`, {code});
	}

	const getLabels = () => {
		return axios.get(`/api/labels`);
	}

	return {
		authCheck, validateAuth, getURL, getLabels
	}
}

export default new GoogleAPIs;