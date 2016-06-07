import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import faker from 'faker';
import _ from 'lodash';
import numeral from 'numeral';

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

const   APPROVED = "approved",
        PENDING = "pending",
        REJECTED = "rejected",
        APPLICATION_STATES = [APPROVED, PENDING, REJECTED];


let makeFakeApplications = (count) => {
    let applications = [];
    for (let i = 0 ; i < count ; i++) {
        let application = {
            key: faker.random.uuid(),
            status: _.sample(APPLICATION_STATES),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            dateOfBirth: faker.date.past(),
            email: faker.internet.email(),
            phone: faker.phone.phoneNumber(),
            streetAddress: faker.address.streetAddress(),
            streetAddressCont: "",
            city: faker.address.city(),
            state: faker.address.stateAbbr(),
            zipCode: faker.address.zipCode(),
            coverage: faker.random.number(200000),
            socialSecurityNumber: faker.random.number(),
            submittedAt: faker.date.recent()
        };

        applications.push(application);
    }
    return applications;
};

class ApplicationList extends Component {

    constructor(props, context){
        super(props, context);
        let applications = makeFakeApplications(20);
        this.state = {
            applications: applications,
            filter: "",
            sort: "lastName"
        };
    }

    test() {
        alert("TEST");
    }

    render() {
        let applicationRows = this.state.applications.map((application) => {
            return <ApplicationListItem {...application} />;
        });

        return(
            <Paper style={{margin:20, padding:20}}>
                <h2>Applications</h2>
                <Divider/>
                <Table>
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Status</TableHeaderColumn>
                            <TableHeaderColumn>Coverage Amount</TableHeaderColumn>
                            <TableHeaderColumn>Submitted At</TableHeaderColumn>
                            <TableHeaderColumn></TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {applicationRows}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

class ApplicationListItem extends Component {
    render() {
        return (
            <TableRow hoverable={true}>
                <TableRowColumn>{this.props.lastName}, {this.props.firstName}</TableRowColumn>
                <TableRowColumn><div className={"status-"+this.props.status}>{this.props.status}</div></TableRowColumn>
                <TableRowColumn>{numeral(this.props.coverage).format('$0,0.00')}</TableRowColumn>
                <TableRowColumn>{this.props.submittedAt.toDateString()}</TableRowColumn>
                <TableRowColumn><Link to="/applications/{this.props.key}">View</Link></TableRowColumn>
            </TableRow>
        );
    }
}

export default ApplicationList;
