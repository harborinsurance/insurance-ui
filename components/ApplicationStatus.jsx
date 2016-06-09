

import React, { Component, PropTypes } from "react";

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

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
        // axios.get(`/api/applications/${this.props.params.id}`).then((application) => {
        //     this.setState({application: application.data});
        // }).catch((e) => {
        //     console.error(e);
            let application = makeFakeApplications(1)[0];
            application.status = "approved";
            this.setState({application:application});
        // });
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
            <div style={{disply:"flex", justifyContent:"space-around"}}>
            <Paper style={{margin:"auto", marginTop: 40, width:450}}>
                <AppBar title={`Application for ${this.state.application.firstName} ${this.state.application.lastName}`} showMenuIconButton={false}/>
                {content}
            </Paper>
            </div>
        );
    }
}

export default ApplicationStatus;
