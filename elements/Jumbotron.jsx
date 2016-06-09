import React from "react";

export default class Jumbotron extends React.Component {
	render() {
		let { type } = this.props;
		let url = {
			"JumboTron": require("./images/Storm_JumboTron.jpg")
		}[type];
		return <img src={url} className="bg" />;
	}
}
Jumbotron.propTypes = {
	type: React.PropTypes.oneOf(["JumboTron"])
};