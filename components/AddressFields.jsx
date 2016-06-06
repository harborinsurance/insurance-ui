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
            <Paper style={this.props.defaultStyle}>

                <TextField floatingLabelText="Street address" onChange={this.handleChange.bind(this, "street1")}/>
                <br />
                <TextField floatingLabelText="Street address cont." onChange={this.handleChange.bind(this, "street2")}/>
                <br />
                <TextField floatingLabelText="City" onChange={this.handleChange.bind(this, "city")}/>
                <br />
                <TextField floatingLabelText="State" onChange={this.handleChange.bind(this, "state")}/>
                <br />
                <TextField floatingLabelText="Zip code" type="number" value={this.props.fieldValues.zipCode} onChange={this.handleChange.bind(this, "zipCode")}/>
                <br />
                <RaisedButton className="next" label="Next" secondary={true} disabled={nextDisabled} onClick={this.props.nextStep}/>
            </Paper>
        );
    }
}

export default AddressFields;
