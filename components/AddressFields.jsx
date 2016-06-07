import React, {Component, PropTypes} from 'react';

import mui, {
    TextField,
    RaisedButton,
    Paper
} from 'material-ui';

class AddressFields extends Component {

    handleChange(source, e, payload) {
        let updateValues = [];
        updateValues[source] = e.target.value;
        this.props.updateFields(updateValues);
    }

    render() {
        const nextDisabled = (!(this.props.fieldValues.street1 && this.props.fieldValues.street2 && this.props.fieldValues.city && this.props.fieldValues.state && this.props.fieldValues.zipCode));

        return (
            <div style={this.props.containerStyle}>
                <Paper style={this.props.paperStyle}>
                    <TextField floatingLabelText="Street address" onChange={this.handleChange.bind(this, "street1")} value={this.props.fieldValues.street1}/>
                    <br />
                    <TextField floatingLabelText="Street address cont." onChange={this.handleChange.bind(this, "street2")} value={this.props.fieldValues.street2}/>
                    <br />
                    <TextField floatingLabelText="City" onChange={this.handleChange.bind(this, "city")} value={this.props.fieldValues.city}/>
                    <br />
                    <TextField floatingLabelText="State" onChange={this.handleChange.bind(this, "state")} value={this.props.fieldValues.state}/>
                    <br />
                    <TextField floatingLabelText="Zip code" type="number" onChange={this.handleChange.bind(this, "zipCode")} value={this.props.fieldValues.zipCode}/>
                </Paper>
                <RaisedButton className="prev" label="Back" secondary={true} onClick={this.props.prevStep} style={this.props.prevButtonStyle}/>
                <RaisedButton className="next" label="Next" secondary={true} onClick={this.props.nextStep} disabled={nextDisabled} style={this.props.nextButtonStyle}/>
            </div>
        );
    }
}

export default AddressFields;
