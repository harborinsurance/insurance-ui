import React, {Component, PropTypes} from 'react';

import mui, {
    TextField,
    SelectField,
    RaisedButton,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableRow,
    TableRowColumn,
    Divider
} from 'material-ui';

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
