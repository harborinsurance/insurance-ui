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
    return (
      <div className="applicationForm">
        <div className="form-row">

          <div className="form-row__item">
            <SelectField name="product" value={this.props.fieldValues.product} onChange={this.props.handleChange} floatingLabelText="Product">
              <MenuItem value={"autos"} disabled={true} primaryText="Autos"/>
              <MenuItem value={"boat"} disabled={true} primaryText="Boat"/>
              <MenuItem value={"renters"} disabled={false} primaryText="Renters"/>
              <MenuItem value={"homeOwner"} disabled={true} primaryText="Home Owner"/>
              <MenuItem value={"oversease"} disabled={true} primaryText="Overseas"/>
              <MenuItem value={"pet"} disabled={true} primaryText="Pet"/>
              <MenuItem value={"jewelry"} disabled={true} primaryText="Jewelry"/>
              <MenuItem value={"rv"} disabled={true} primaryText="RV"/>
            </SelectField>
          </div>

          <div className="form-row__item">
            <TextField
              name="zipCode"
              onChange={this.props.handleChange}
              floatingLabelText="Zip code"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-row__item">
            <TextField
              name="firstName"
              onChange={this.props.handleChange}
              floatingLabelText="First name"
            />
          </div>

          <div className="form-row__item">
            <TextField name="lastName" onChange={this.props.handleChange} floatingLabelText="Last name" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-row__item">
            <TextField name="phone" onChange={this.props.handleChange} floatingLabelText="Phone" type="tel"/>
          </div>
          <div className="form-row__item">
            <TextField name="email" onChange={this.props.handleChange} floatingLabelText="Email" type="email"/>
          </div>
        </div>

        <div className="form-row">
          <div className="form-row__item">
            <TextField name="streetAddress" onChange={this.props.handleChange} floatingLabelText="Street address" />
          </div>

          <div className="form-row__item">
            <TextField name="streetAddressCont" onChange={this.props.handleChange} floatingLabelText="Street address cont." />
          </div>
        </div>

        <div className="form-row">
          <div className="form-row__item">
            <TextField name="city" onChange={this.props.handleChange} floatingLabelText="City" />
          </div>
          <div className="form-row__item">
            <TextField name="state" onChange={this.props.handleChange} floatingLabelText="State" />
          </div>
        </div>

        <div className="form-row form-row--padded">
          <div className="form-row__item">
            <DatePicker name="dateOfBirth" onChange={this.props.handleChange} hintText="Date of birth (mm/dd/yyyy)" defaultDate={new Date("2000")} />
          </div>
        </div>
      </div>
    )
  }
};

export default ApplicationPage;
