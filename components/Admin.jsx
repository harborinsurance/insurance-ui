import React, {Component, PropTypes} from 'react';
import mui, {DatePicker, TextField, RaisedButton, Paper} from 'material-ui';
import _ from 'lodash';

import ApplicationList from './ApplicationList';
import ApplicationView from './ApplicationView';
import { makeFakeApplications } from '../src/helpers';



const styles = {
    container: {
        display: "flex"
    },
    leftPaper: {
        flex:4,
        padding: 20,
        margin:20
    },
    rightPaper: {
        flex:2,
        padding: 20,
        margin:20
    }
};

class Admin extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            selectedApplication: {},
            applications: []
        };
    }

    getApplications() {
        return makeFakeApplications(40);
    }

    componentDidMount() {
        let applications = this.getApplications();
        this.setState({ applications: applications });
    }

    selectApplication(id) {
        let selectedApplication = _.find(this.state.applications, (application) => { return application.id === id ;} );
        console.log(selectedApplication);
        this.setState({selectedApplication: selectedApplication});
    }

    updateApplication(id, fields) {
        let applications = this.state.applications;
        for (let i = 0; i < applications; i++) {
            let application = applications[i];
            if (application.id !== id) {
                continue;
            }

            applications[i] = Object.assign({}, application, fields);
            break;
        }

        this.setState({applications: applications});
    }

    render () {
        return (
            <div style={styles.container}>
                <Paper style={styles.leftPaper}>
                    <ApplicationList applications={this.state.applications} selectApplication={this.selectApplication.bind(this)} />
                </Paper>
                <Paper style={styles.rightPaper}>
                    <ApplicationView application={this.state.selectedApplication} updateApplication={this.updateApplication.bind(this)}/>
                </Paper>
            </div>
        );
    }
}

export default Admin;
