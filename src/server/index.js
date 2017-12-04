import compression from 'compression';
import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import session from 'express-session';

import { APP_NAME, STATIC_PATH, WEB_PORT} from '../shared/config';
import { isProd } from '../shared/util';
import renderApp from './render-app';

import gmailAuth from "./models/google-api";


const app = express()

app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(STATIC_PATH, express.static('dist'))
app.use(STATIC_PATH, express.static('public'))

const getAuthToken = (req, res) => {
	res.send(gmailAuth.getNewToken());
}

const validateAuthToken = (req, res) => {
	gmailAuth.authorizationCode(req, req.body.code || req.session.query.code, (response) => {
		if(response.status && response.status !== 200){
			return res.status(response.status).send(response);
		}
		return res.send(response);
	});
}

//use sessions for tracking logins
app.use(session({
	secret: 'work hard',
	resave: true,
	saveUninitialized: false,
}));

app.get('/', (req, res) => {
	req.session.query = req.query;
	res.send(200, renderApp(APP_NAME));
})

app.use("/api", (req, res, next) => {
	if(!(req.session && req.session.token)){
		if((req.body && req.body.code) || req.session.query.code){
			validateAuthToken(req, res);
		} else {
			getAuthToken(req, res);
		}
	} else {
		next();
	}
});

app.get('/api/login', (req, res) => {
	res.send({authorized: req.session && req.session.token});
});

app.post('/api/login', (req, res) => {
	validateAuthToken(req, res);
});

app.get('api/generateURL', (req, res) => {
	getAuthToken(req, res);
})

app.get('/api/labels', (req, res) => {
	gmailAuth.listLabels((response) => {
		res.send(response);
	});
});


app.listen(WEB_PORT, () => {
	// eslint-disable-next-line no-console
	console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' : '(development).\nKeep "yarn dev:wds" running in an other terminal'}.`)
})
