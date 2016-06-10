import React, { Component } from 'react';
import './style.scss';

import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';

class CoveragePage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { fieldValues } = this.props;

    let ssn = (
      +fieldValues.coverage >= 100000 ? (
        <div className="ssn">
          <h3 className="important">Important Notice</h3>
          <p>For coverage amounts greater than $100,000.00 (USD) a credit check is required.</p>

          <TextField
            name="socialSecurityNumber"
            floatingLabelText="Social security number"
            onChange={this.props.handleChange}
            value={fieldValues.socialSecurityNumber}
          />
        </div>) : ( '' )

    );

    return (
      <div className="coverageForm">
        <div className="form-row">
          <p>Enter your desired coverage amount</p>
          <TextField
            name="coverage"
            className="text-field currency"
            floatingLabelText="Desired coverage amount"
            onChange={this.props.handleChange}
            value={fieldValues.coverage}
          />
        </div>
        <div className="form-row">
          {ssn}
        </div>
      </div>
    )
  }


};

export default CoveragePage;
