

import React, { Component, PropTypes } from "react";
import mui, {
    Divider,
    TextField,
    SelectField,
    RaisedButton,
    MenuItem,
    Paper,
    Table,
    TableHeader,
    TableHeaderColumn,
    TableBody,
    TableRow,
    TableRowColumn
} from 'material-ui';
import _ from 'lodash';
import axios from 'axios';

import Policy from './Policy';
import {makeFakeApplications} from '../src/helpers';


class ApplicationStatus extends Component {
    constructor (props, context) {
        super(props, context);
        this.state = {
            application: {}
        };
    }

    componentDidMount() {
        axios.get(`/api/applications/${this.props.params.id}`).then((application) => {
            this.setState({application: application});
        }).catch((e) => {
            console.error(e);
            let application = makeFakeApplications(1)[0];
            application.status = "approved";
            this.setState({application:application});
        });
    }

    render () {
        let content;

        switch(this.state.application.status) {
            case "approved":
                content = <Policy {...this.state.application.policy} applicationID={this.props.params.id}/>;
                break;
            case "pending":
                content = <h3>Your application is pending review.  You will be notified via text message when its status is updated.</h3>;
                break;
            case "rejected":
                content = <h3>Your application has been rejected.  Please re-apply.</h3>;
                break;
        }

        return (
            <Paper style={{margin:20, padding:20}}>
                <h2>Application Status for {this.state.application.firstName} {this.state.application.lastName}</h2>
                <Divider/>
                {content}
            </Paper>
        );
    }
}

export default ApplicationStatus;
