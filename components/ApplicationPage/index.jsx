import React, { Component } from 'react';
import './style.scss';

import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';


class ApplicationPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <div className="applicationForm">
        <div>
          <SelectField floatingLabelText="Product">
            <MenuItem value={"autos"} disabled={true} primaryText="Autos"/>
            <MenuItem value={"boat"} disabled={true} primaryText="Boat"/>
            <MenuItem value={"renters"} disabled={false} primaryText="Renters"/>
            <MenuItem value={"homeOwner"} disabled={true} primaryText="Home Owner"/>
            <MenuItem value={"oversease"} disabled={true} primaryText="Overseas"/>
            <MenuItem value={"pet"} disabled={true} primaryText="Pet"/>
            <MenuItem value={"jewelry"} disabled={true} primaryText="Jewelry"/>
            <MenuItem value={"rv"} disabled={true} primaryText="RV"/>
          </SelectField>
          <br/>

          <TextField onChange={this.props.handleChange} floatingLabelText="First name" />
          <br/>
          <TextField onChange={this.props.handleChange} floatingLabelText="Last name" />
          <br />
          <br />
          <DatePicker onChange={this.props.handleChange} hintText="Date of birth (mm/dd/yyyy)" defaultDate={new Date("2000")} />

          <TextField onChange={this.props.handleChange} floatingLabelText="Phone" type="tel"/>
          <br />
          <TextField onChange={this.props.handleChange} floatingLabelText="Email" type="email"/>
          <br />
          <TextField onChange={this.props.handleChange} floatingLabelText="Street address" />
          <br />
          <TextField onChange={this.props.handleChange} floatingLabelText="Street address cont." />
          <br />
          <TextField onChange={this.props.handleChange} floatingLabelText="City" />
          <br />
          <TextField onChange={this.props.handleChange} floatingLabelText="State" />
          <br />
          <TextField onChange={this.props.handleChange} floatingLabelText="Zip code" />
        </div>
      </div>
    )
  }

};

export default ApplicationPage;
