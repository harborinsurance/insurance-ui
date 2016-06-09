import React, { Component, PropTypes } from "react";

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import _ from 'lodash';

import {humanizeFieldName} from '../src/helpers';


class ApplicationReview extends Component {
    constructor (props, context) {
        super(props, context);

        console.log("applicationReview constructor")
    }

    approveApplication() {
        if (this.props.application.status !== "pending") {
            return;
        }

        let approvedApplication = Object.assign({}, this.props.application, {status: "approved"});
        approvedApplication
        this.props.updateApplication(approvedApplication);
    }

    rejectApplication() {
        if (this.props.application.status !== "pending") {
            return;
        }

        let rejectedApplication = Object.assign({}, this.props.application, {status: "rejected"});
        this.props.updateApplication(rejectedApplication);
    }

    render () {



        let content;
        if (_.isEmpty(this.props.application)) {
            content = (
                <div>
                <h2>No application selected</h2>
                <Divider/>
                </div>
            );
        } else {
            const fieldNames = [
                "status",
                "phone",
                "email",
                "streetAddress",
                "streetAddressCont",
                "city",
                "state",
                "zipCode",
                "coverage",
                "socialSecurityNumber",
                "riskScore",
                "creditScore"
            ];
            let rows = [];
            for (let fieldName of fieldNames) {
                let fieldTitle = humanizeFieldName(fieldName);
                let fieldValue = this.props.application[fieldName];
                if (!!fieldValue) {
                    rows.push(
                        <TableRow>
                            <TableRowColumn>{fieldTitle}</TableRowColumn>
                            <TableRowColumn>{fieldValue}</TableRowColumn>
                        </TableRow>
                    );
                }
            }

            let reviewOptions;
            if (this.props.application.status === "pending") {
                reviewOptions = (
                    <div style={{display:"flex"}}>
                        <RaisedButton primary={true} label="Reject" style={{flex:2, margin:20, marginRight:10}} onClick={this.rejectApplication.bind(this)}/>
                        <RaisedButton secondary={true} label="Approve" style={{flex:2, margin: 20, marginLeft:10}} onClick={this.approveApplication.bind(this)}/>
                        <Divider/>
                    </div>
                );
            }

            content = (
                <div>
                    <h2>{this.props.application.firstName} {this.props.application.lastName}</h2>
                    <Divider/>
                    {reviewOptions}

                    <Table>
                        <TableBody displayRowCheckbox={false}>
                            {rows}
                        </TableBody>
                    </Table>
                </div>
            );
        }



        return (
            <div>{content}</div>
        );
    }
}

export default ApplicationReview;
