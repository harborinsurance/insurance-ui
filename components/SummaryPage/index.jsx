import React, { Component } from 'react';
import './style.scss';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

class SummaryPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { fieldValues } = this.props;
    console.log(fieldValues);

    return (
      <div className="SummaryForm">
        <div className="form-row">
          <div className="form-row__item bold">Product </div>
          <div className="form-row__item">{fieldValues.product} </div>
        </div>

        <div className="form-row">
          <div className="form-row__item bold">Zip Code </div>
          <div className="form-row__item">{fieldValues.zipCode} </div>
        </div>

        <div className="form-row">
          <div className="form-row__item bold">Full Name </div>
          <div className="form-row__item">{fieldValues.firstName} {fieldValues.lastName}</div>
        </div>

        <div className="form-row">
          <div className="form-row__item bold">Phone Number </div>
          <div className="form-row__item">{fieldValues.phone} </div>
        </div>

        <div className="form-row">
          <div className="form-row__item bold">Email </div>
          <div className="form-row__item">{fieldValues.email} </div>
        </div>

        <div className="form-row">
          <div className="form-row__item bold">Stress Address </div>
          <div className="form-row__item">{fieldValues.streetAddress} {fieldValues.streetAddressCont}</div>
        </div>

        <div className="form-row">
          <div className="form-row__item bold">City </div>
          <div className="form-row__item">{fieldValues.city} </div>
        </div>

        <div className="form-row">
          <div className="form-row__item bold">State </div>
          <div className="form-row__item">{fieldValues.state} </div>
        </div>

        <div className="form-row form-row--padded">
          <div className="form-row__item bold">Date of Birth</div>
          <div className="form-row__item">{fieldValues.dateOfBirth} </div>
        </div>
      </div>
    )
  }

};

export default SummaryPage;
