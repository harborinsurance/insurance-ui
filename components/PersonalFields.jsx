import React, {Component, PropTypes} from 'react';

import mui, {
    DatePicker,
    TextField,
    RaisedButton,
    Paper
} from 'material-ui';

class PersonalFields extends Component {

    handleChange(source, e, payload) {
        let updateValues = [];
        if (source === "birthDate") {
            updateValues[source] = payload;
        } else {
            updateValues[source] = e.target.value;
        }
        this.props.updateFields(updateValues);
    }

    render() {
        const nextDisabled = (!(this.props.fieldValues.firstName && this.props.fieldValues.lastName && this.props.fieldValues.birthDate));
        return (
            <Paper style={this.props.defaultStyle}>

                <TextField ref="firstName" floatingLabelText="First name" onChange={this.handleChange.bind(this, "firstName")}/>
                <br />
                <TextField ref="lastName" floatingLabelText="Last name" onChange={this.handleChange.bind(this, "lastName")}/>
                <br/>
                <DatePicker ref="birthDate" placeholder="Date of birth" mode="landscape" onChange={this.handleChange.bind(this, "birthDate")}/>
                <br/>

                <RaisedButton className="next" label="Next" secondary={true} onClick={this.props.nextStep} disabled={nextDisabled}/>

            </Paper>
        );
    }
}

export default PersonalFields;
