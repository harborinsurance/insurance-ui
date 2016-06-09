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
  <div>
  <p>Enter your desired coverage amount</p>
    <TextField floatingLabelText="Desired coverage amount" />
  </div>
  )
};

export default CoveragePage;
