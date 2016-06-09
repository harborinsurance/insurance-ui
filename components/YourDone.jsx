import React, {Component, PropTypes} from 'react';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import { humanizeFieldName } from '../src/helpers';

class SubmitApplicationForm extends Component {
    constructor (props, context) {
        super(props, context);
    }

    render () {
        return (
            <div style={this.props.containerStyle}>
                <Paper style={this.props.paperStyle}>

                    <h3>Thanks for your application!</h3>
                    <Divider/>
                    <p>We are reviewing your application and will send you a text message once your application has been reviewed.</p>
                </Paper>
            </div>
        );
    }
}




export default SubmitApplicationForm;
