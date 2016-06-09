import React from 'react';
import './style.scss';

import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';

const CoveragePage = (props) => {
  return (
  <div className="coverageForm">
    <div>
    <p>Enter your desired coverage amount</p>
      <TextField className="text-field" floatingLabelText="Desired coverage amount" />

      <div className="ssn">
        <h3 className="important">Important Notice</h3>
        <p>For coverage amounts greater than $100,000.00 (USD) a credit check is required.</p>
        <TextField floatingLabelText="Social security number" />
      </div>
    </div>
  </div>
  )
};

export default CoveragePage;
