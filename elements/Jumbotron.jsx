import React from "react";
import { Link } from 'react-router';

import mui, {RaisedButton} from 'material-ui';

export default class Jumbotron extends React.Component {
	
	normal() {
		let url = require('./images/Storm_JumboTron.jpg');
    return {
      backgroundImage: "url('" + url + "')"
    }
  }
	
	goto (source, e, payload) {
		browserHistory.push(source);
	}
	
	
	
  render() {
		let styles = this.normal();
		const buttonStyle = {
				marginRight: 20
		};
		let admin = "/admin",
			apply = "apply";

    return (
      <div className="home" style={styles}>
				<div className="text-vcenter">
					<div className="floating-text">
						<h1>Peace of Mind</h1>
						<h3>Protect your assets with comprehensive coverage to help you weather life's storms.</h3>
						<Link to={apply}><RaisedButton label="Apply" secondary={true} style={buttonStyle}/></Link>
						<Link to={admin}><RaisedButton label="Admin" secondary={true} style={buttonStyle}/></Link>
					</div>
				</div>
      </div>
    )
  }
}