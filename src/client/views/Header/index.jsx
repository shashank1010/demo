import React from 'react';
import { Button, Dropdown, Form, Grid, Image } from "semantic-ui-react";

const UserDropdown = (props) => {
	return (
		<div>
			{/*<Image avatar src={props.user.picture.data.url} />*/}
			{`Greetings`}
		</div>
	)
}

const AppHeader = (props) => 
	<Grid padded className="app-header">
		<Grid.Column floated="right" style={{ width: "auto" }}>
			{
				props.isAuthenticated ? <UserDropdown user={props.user}  /> : 
				!props.showForm ?
				<Button onClick={() => {props.PopUpAuthWindow()}} content="Signin with Google" />
				: 
				<Form>
					<Form.Input value={props.accessToken} onChange={props.onChange} />
					<Button primary disabled={!props.accessToken.length} onClick={() => {props.onSubmit();}} content="Sign In" />
					<Button default onClick={() => {props.resetForm()}} content="Cancel" />
				</Form>
			}
		</Grid.Column>
	</Grid>

export default AppHeader;