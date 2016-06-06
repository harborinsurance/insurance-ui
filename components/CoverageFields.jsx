import React, {Component, PropTypes} from 'react';

import mui, {
    TextField,
    RaisedButton,
    Paper
} from 'material-ui';


class CoverageFields extends Component {
    handleChange(source, e, payload) {
        let updateValues = [];
        updateValues[source] = e.target.value;
        this.props.updateFields(updateValues);
    }


    render () {
        const ssnEnabled = this.props.fieldValues.coverage && this.props.fieldValues.coverage >= 100000;
        return (
            <Paper style={this.props.defaultStyle}>
                <TextField floatingLabelText="Coverage amount" type="number" onChange={this.handleChange.bind(this, "coverage")}/>
                {ssnEnabled ? <TextField floatingLabelText="Social security" type="number" onChange={this.handleChange.bind(this, "ssn")}/> : null}
            </Paper>
        );
    }
}

export default CoverageFields;
