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

import {humanizeFieldName} from '../src/helpers';


class ApplicationReview extends Component {
    constructor (props, context) {
        super(props, context);
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
                "credtiScore"
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
        }



        return (
            <div>{content}</div>
        );
    }
}

export default ApplicationReview;
