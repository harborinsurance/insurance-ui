import React, {Component, PropTypes} from 'react';
import mui, {DatePicker, TextField, RaisedButton, Paper} from 'material-ui';
import _ from 'lodash';
import $ from 'jquery';

import ApplicationList from './ApplicationList';
import ApplicationReview from './ApplicationReview';
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

    componentDidMount() {
        this.setState({
            applications: makeFakeApplications(40)
        });
        // $.ajax({
        //     url: "/api/applications/",
        //     dataType: "json",
        //     cache: false,
        //     success: function(applications) {
        //         this.setState({applications: applications});
        //     }.bind(this),
        //     error: function(xhr, status, err) {
        //         console.error(this.props.url, status, err.toString());
        //     }.bind(this)
        // });
    }

    selectApplication(id) {
        let selectedApplication = _.find(this.state.applications, (application) => { return application._id === id ;} );
        console.log(selectedApplication);
        this.setState({selectedApplication: selectedApplication});
    }

    updateApplication(application) {

        console.log(application);

        // update application on server
        // update state.applications


        let applications = this.state.applications;
        for (let i = 0; i < applications.length; i++) {
            let a = applications[i];
            if (a._id !== application._id) {
                continue;
            }

            applications[i] = Object.assign({}, a, application);
            break;
        }

        if (this.state.selectedApplication._id === application._id) {
            this.setState({selectedApplication: application});
        }

        this.setState({applications: applications});
        console.log(this.state);
    }

    render () {
        return (
            <div style={styles.container}>
                <Paper style={styles.leftPaper}>
                    <ApplicationList applications={this.state.applications} selectApplication={this.selectApplication.bind(this)} />
                </Paper>
                <Paper style={styles.rightPaper}>
                    <ApplicationReview application={this.state.selectedApplication} updateApplication={this.updateApplication.bind(this)}/>
                </Paper>
            </div>
        );
    }
}

export default Admin;
