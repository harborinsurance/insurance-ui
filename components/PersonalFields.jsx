import React, {Component, PropTypes} from 'react';

import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';


class PersonalFields extends Component {

    handleChange (source, e, payload) {
        let updateValues = {};
        if (source === "dateOfBirth") {
            updateValues[source] = payload;
        } else {
            updateValues[source] = e.target.value;
        }
        this.props.updateFields(updateValues);
    }

    render () {
        const nextDisabled = (!(this.props.fieldValues.firstName && this.props.fieldValues.lastName && this.props.fieldValues.dateOfBirth && this.props.fieldValues.phone && this.props.fieldValues.email));
        return (
            <div style={this.props.containerStyle}>
                <Paper style={this.props.paperStyle}>
                    <TextField ref="firstName" floatingLabelText="First name" onChange={this.handleChange.bind(this, "firstName")} value={this.props.fieldValues.firstName}/>
                    <br/>
                    <TextField ref="lastName" floatingLabelText="Last name" onChange={this.handleChange.bind(this, "lastName")} value={this.props.fieldValues.lastName}/>
                    <br/>
                    <DatePicker ref="dateOfBirth" placeholder="Date of birth" defaultDate={new Date("2000")} onChange={this.handleChange.bind(this, "dateOfBirth")} value={this.props.fieldValues.dateOfBirth}/>
                    <br/>
                    <TextField ref="phone" floatingLabelText="Phone" onChange={this.handleChange.bind(this, "phone")} value={this.props.fieldValues.phone} type="tel"/>
                    <TextField ref="email" floatingLabelText="Email" onChange={this.handleChange.bind(this, "email")} value={this.props.fieldValues.email} type="email"/>
                </Paper>
                <RaisedButton className="prev" label="Back" secondary={true} onClick={this.props.prevStep} style={this.props.prevButtonStyle}/>
                <RaisedButton className="next" label="Next" secondary={true} onClick={this.props.nextStep} disabled={nextDisabled} style={this.props.nextButtonStyle}/>
            </div>
        );
    }
}

export default PersonalFields;
