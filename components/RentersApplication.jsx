import React, {Component, PropTypes} from 'react';

import mui, {DatePicker, TextField, SelectField} from 'material-ui';

const defaultStyle = {
    marginLeft: 20
};

class RentersApplication extends Component {
    constructor (props, context) {
        super(props, context);
        this.state = {};
    }

    getInitialState () {
        return {};
    }

    render () {
        return (
            <div style={defaultStyle}>
                <SelectField>
                </SelectField>
                <TextField floatingLabelText="Zip code"  />
                <TextField floatingLabelText="First name"/>
                <TextField floatingLabelText="Last name"/>
                <DatePicker floatingLabelText="Date of birth"/>
                <TextField floatingLabelText="Name, first"/>
                <TextField floatingLabelText="Name, first"/>
                <TextField floatingLabelText="Name, first"/>
            </div>
        );
    }

}

export default RentersApplication;
