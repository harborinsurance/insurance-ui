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

    // fieldValues.fistName,.. etc

    const date = new Date(fieldValues.dateOfBirth);
    const dateString = `${date.getMonth()}/${date.getDate()}/${date.getYear()}`;

    return (
      <div className="summary-form">
          <div className="form-row">
            <div className="form-row__item bold">Product </div>
            <div className="form-row__item">{fieldValues.product} </div>
          </div>

          <div className="form-row">
            <div className="form-row__item bold">Coverage Amount</div>
            <div className="form-row__item">{fieldValues.coverage} </div>
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

          <div className="form-row">
            <div className="form-row__item bold">Date of Birth</div>
            <div className="form-row__item">{dateString} </div>
          </div>


      </div>
    )
  }

};

export default SummaryPage;
