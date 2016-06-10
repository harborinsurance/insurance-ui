import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import _ from 'lodash';
import numeral from 'numeral';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


import { makeFakeApplications } from '../src/helpers';

class ApplicationList extends Component {

    constructor(props, context){
        super(props, context);
        this.state = {
            filter: "",
            sort: "lastName",
            stripedRows: true
        };
    }

    render() {
        let applicationRows = this.props.applications.map((application) => {
            return <ApplicationListItem {...application} key={application._id} selectApplication={this.props.selectApplication}/>;
        });

        return(
            <div>
              <h2>Applications</h2>
              <Divider/>
              <Table selectable={true} >
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                  <TableRow>
                    <TableHeaderColumn>Name</TableHeaderColumn>
                    <TableHeaderColumn>Status</TableHeaderColumn>
                    <TableHeaderColumn>Coverage Amount</TableHeaderColumn>
                    <TableHeaderColumn>Submitted At</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody stripedRows="true">
                  {applicationRows}
                </TableBody>
              </Table>
            </div>
        );
    }
}

class ApplicationListItem extends Component {
    render() {
        return (
            <TableRow hoverable={true} onMouseUp={() => { this.props.selectApplication(this.props._id); }}>
              <TableRowColumn>{this.props.lastName}, {this.props.firstName}</TableRowColumn>
              <TableRowColumn><div className={"status-"+this.props.status}>{this.props.status}</div></TableRowColumn>
              <TableRowColumn>{numeral(this.props.coverage).format('$0,0.00')}</TableRowColumn>
              <TableRowColumn>{new Date(this.props.submittedAt).toDateString()}</TableRowColumn>
            </TableRow>
        );
    }
}

export default ApplicationList;
