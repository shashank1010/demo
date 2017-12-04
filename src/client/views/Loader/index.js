import React from "react";
import { Segment } from "semantic-ui-react";

const AppLoader = (props) => props.loading ? <Segment loading className="ui-loader" /> : null;

export default AppLoader;