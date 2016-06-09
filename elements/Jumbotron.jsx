import React from "react";

export default class Jumbotron extends React.Component {
  render() {
	  let divStyle = {
	backgroundImage: 'url(' + './images/Storm_JumboTron.jpg' + ')'
};
    return (
		<div style={divStyle}>
			... Your Content ...
	  </div>
    );
  }
}