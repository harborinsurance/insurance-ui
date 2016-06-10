import React, {Component, PropTypes} from 'react';

import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import _ from 'lodash';
import $ from 'jquery';
import axios from 'axios';

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
        // this.setState({
        //     applications: makeFakeApplications(40)
        // });
        $.ajax({
            url: "/api/applications/",
            dataType: "json",
            cache: false,
            success: function(applications) {
                console.log(applications)
                applications = _.sortBy(applications, (application) => { return application.submittedAt ; }).reverse();
                this.setState({applications: applications});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
                // populate with dummy data when server failure
                // because demo.
                console.log("NOTE :: server error.  populating 'state.applications' with dummy data");
                this.setState({
                    applications: makeFakeApplications(40)
                });
            }.bind(this)
        });
    }


    selectApplication(id) {
        let selectedApplication = _.find(this.state.applications, (application) => { return application._id === id ;} );
        console.log(selectedApplication);
        this.setState({selectedApplication: selectedApplication});
    }

    updateApplication(application) {

        axios.put(`/api/applications/${application._id}`, application).then((res) => {
            console.log(res);

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
        }).catch((e) => {
            console.error(e);
        });


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
