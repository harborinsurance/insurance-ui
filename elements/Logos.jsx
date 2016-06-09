import React from "react";

export default class Logos extends React.Component {
	render() {
		let { type } = this.props;
		let url = {
			"150": require("./images/Harbor_Mark_150.png"),
			"300": require("./images/Harbor_Mark_300.png"),
			"600": require("./images/Harbor_Mark_600.png")
		}[type];
		return <img src={url} height="50" width="150" />;
	}
}
Logos.propTypes = {
	type: React.PropTypes.oneOf(["150", "300", "600"])
};