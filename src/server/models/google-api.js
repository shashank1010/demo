import google from 'googleapis';
import googleAuth from "google-auth-library";
import session from 'express-session'

import credentials from "../../shared/client_secret.json";

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

function gAuth(token) {
	this.getNewToken = () => {
		const authUrl = this.oauth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: SCOPES
		});

		console.log(`Authorize this app by visiting this url: ${authUrl}`);

		return {url: authUrl, authorized: false};
	}

	this.authorizationCode = (req, code, cb) => {
			this.oauth2Client.getToken(code, (err, token) => {
				if (err) {
					console.log(`Error while trying to retrieve access token`, err);

					return cb({status: 400, message: `Error while trying to retrieve access token`, error: err});
				}
				req.session.token = token;
				this.oauth2Client.credentials = token;
				cb({authorized: true});
			});
	}

	this.listLabels = (cb) => {
			const gmail = google.gmail('v1');
			gmail.users.labels.list({
				auth: this.oauth2Client,
				userId: 'me',
			}, function(err, response) {
				if (err) {
					console.log(`The API returned an error. ${err}`);
					return cb({status: 400, message: `The API returned an error.`, error: err});
				}
				var labels = response.labels;
				if (labels.length == 0) {
					console.log('No labels found.');
				} else {
					console.log('Labels:');
					for (var i = 0; i < labels.length; i++) {
						var label = labels[i];
						console.log('- %s', label.name);
					}
				}
				cb({labels: response.labels, authorized: true});
			});
	}


	//Work in Progress -- Please Skip
	this.listEmails = (cb) => {
		debugger;
			const gmail = google.gmail('v1');
			gmail.users.messages.list({
				auth: this.oauth2Client,
				userId: 'me',
			}, function(err, response) {
				if (err) {
					console.log(`The API returned an error. ${err}`);
					return cb({status: 400, message: `The API returned an error.`, error: err});
				}
				debugger;
				var emails = response.messages;
				if (emails.length == 0) {
					console.log('No emails found.');
				} else {
					console.log('Labels:');
					for (var i = 0; i < emails.length; i++) {
						var email = emails[i];
						console.log('- %s', email.name);
					}
				}
				cb({emails: response.emails, authorized: true});
			});
	}
	//Continue Here

	const clientSecret = credentials.installed.client_secret;
	const clientId = credentials.installed.client_id;
	const redirectUrl = credentials.installed.redirect_uris[1];
	const auth = new googleAuth();
	this.oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

	return {
		getNewToken: this.getNewToken,
		authorizationCode: this.authorizationCode,
		listLabels: this.listLabels,
		listEmails: this.listEmails,
		oauth2Client: this.oauth2Client,
	}
}

export default new gAuth();