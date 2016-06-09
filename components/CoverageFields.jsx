import React, {Component, PropTypes} from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

class CoverageFields extends Component {
    handleChange(source, e, payload) {
        let updateValues = {};
        updateValues[source] = e.target.value;
        this.props.updateFields(updateValues);
    }

    render () {
        const ssnEnabled = this.props.fieldValues.coverage && this.props.fieldValues.coverage >= 100000;
        const nextDisabled = (!(this.props.fieldValues.coverage && (ssnEnabled ? this.props.fieldValues.socialSecurityNumber : true)));
        return (
            <div style={this.props.containerStyle}>
                <Paper style={this.props.paperStyle}>
                    <TextField floatingLabelText="Desired coverage amount" type="number" value={this.props.fieldValues.coverage} onChange={this.handleChange.bind(this, "coverage")}/>
                    {ssnEnabled ? <TextField floatingLabelText="Social security number" type="number" value={this.props.fieldValues.socialSecurityNumber} onChange={this.handleChange.bind(this, "socialSecurityNumber")}/> : null}
                </Paper>
                <RaisedButton className="prev" label="Back" secondary={true} onClick={this.props.prevStep} style={this.props.prevButtonStyle}/>
                <RaisedButton className="next" label="Next" secondary={true} onClick={this.props.nextStep} disabled={nextDisabled} style={this.props.nextButtonStyle}/>
            </div>
        );
    }
}

export default CoverageFields;
