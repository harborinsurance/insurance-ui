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
    const { fieldValues } = this.props;
    return (
      <div className="application-form">
        <div className="form-row">

          <div className="form-row__item">
            <SelectField name="product" value={fieldValues.product} onChange={(evt, div, value) => {
              this.props.handleChange(evt, value, 'product');
            }} floatingLabelText="Product">
              <MenuItem value="autos" disabled={true} primaryText="Autos"/>
              <MenuItem value="boat" disabled={true} primaryText="Boat"/>
              <MenuItem value="renters" disabled={false} primaryText="Renters"/>
              <MenuItem value="homeOwner" disabled={true} primaryText="Home Owner"/>
              <MenuItem value="oversease" disabled={true} primaryText="Overseas"/>
              <MenuItem value="pet" disabled={true} primaryText="Pet"/>
              <MenuItem value="jewelry" disabled={true} primaryText="Jewelry"/>
              <MenuItem value="rv" disabled={true} primaryText="RV"/>
            </SelectField>
          </div>

          <div className="form-row__item">
            <TextField
              name="zipCode"
              onChange={this.props.handleChange}
              floatingLabelText="Zip code"
              value={fieldValues.zipCode}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-row__item">
            <TextField
              name="firstName"
              onChange={this.props.handleChange}
              floatingLabelText="First name"
              value={fieldValues.firstName}
            />
          </div>

          <div className="form-row__item">
            <TextField name="lastName" onChange={this.props.handleChange} floatingLabelText="Last name" value={fieldValues.lastName}/>
          </div>
        </div>

        <div className="form-row">
          <div className="form-row__item">
            <TextField name="phone" onChange={this.props.handleChange} floatingLabelText="Phone" type="tel"
              value={fieldValues.phone}
            />
          </div>
          <div className="form-row__item">
            <TextField
              name="email"
              onChange={this.props.handleChange}
              floatingLabelText="Email"
              type="email"
              value={fieldValues.email}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-row__item">
            <TextField
              name="streetAddress"
              onChange={this.props.handleChange}
              floatingLabelText="Street address"
              value={fieldValues.streetAddress}
            />
          </div>

          <div className="form-row__item">
            <TextField
              name="streetAddressCont"
              onChange={this.props.handleChange}
              floatingLabelText="Street address cont."
              value={fieldValues.streetAddressCont}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-row__item">
            <TextField
              name="city"
              onChange={this.props.handleChange}
              floatingLabelText="City"
              value={fieldValues.city}
            />
          </div>
          <div className="form-row__item">
            <TextField
              name="state"
              onChange={this.props.handleChange}
              floatingLabelText="State"
              value={fieldValues.state}
            />
          </div>
        </div>

        <div className="form-row form-row--padded">
          <div className="form-row__item">
            <DatePicker
              name="dateOfBirth"
              onChange={(evt, value) => {
                this.props.handleChange(evt, value, 'dateOfBirth');
              }}
              hintText="Date of birth (mm/dd/yyyy)"
              defaultDate={new Date("2000")}
              value={fieldValues.dateOfBirth}
            />
          </div>
        </div>
      </div>
    )
  }
};

export default ApplicationPage;
