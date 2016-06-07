

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

import {humanizeFieldName} from '../src/helpers';


class ApplicationStatus extends Component {
    constructor (props, context) {
        super(props, context);
        this.state = {
            application: {}
        };
    }

    componentDidMount() {
        axios.get(`/api/applications/${this.props.params.id}`).then((application) => {
            this.setState({application});
        });
    }

    render () {
        let content;
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

            let approveOptions;
            if (this.props.application.status !== "approved") {
                approveOptions = (
                    <div>
                        <RaisedButton primary={true} value="Reject" />
                        <RaisedButton secondary={true} value="Approve" />
                        <Divider/>
                    </div>

                );
            }

            content = (
                <div>
                    <h2>Application for {this.props.application.firstName} {this.props.application.lastName}</h2>
                    <Divider/>
                    {approveOptions}

                    <Table>
                        <TableBody displayRowCheckbox={false}>
                        {rows}
                        </TableBody>
                    </Table>
                </div>
            );



        return (
            <div>{content}</div>
        );
    }
}

export default ApplicationStatus;
