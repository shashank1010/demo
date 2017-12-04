import React from "react";
import _ from "lodash";
import { Grid, Segment } from 'semantic-ui-react'

import appState from "__CLIENT/store";

const Label = (props) => (
	<Grid.Column mobile={1} tablet={3} computer={4} widescreen={5} centered key={props.key}>
				<Segment content={props.label.name} />
	</Grid.Column>
)

const AppLabel = (props) => {
	return (
		props.isAuthenticated ?
			props.labels.length ?
				<Grid padded>
					{
						_.map(props.labels, function(label, index) {
							 return <Label key={index} label={label} />
						})
					}
				</Grid>
			: 
				<Segment content="No Labels Found" />
		:
		null
	)
}

export default AppLabel;