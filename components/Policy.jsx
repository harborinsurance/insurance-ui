import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import _ from 'lodash';
import numeral from 'numeral';
import faker from 'faker';
import axios from 'axios';

import mui, {
    Divider,
    TextField,
    DatePicker,
    SelectField,
    RaisedButton,
    MenuItem,
    Paper,
    Table,
    TableHeader,
    TableHeaderColumn,
    TableBody,
    TableRow,
    TableRowColumn
} from 'material-ui';

import { makeFakeApplications } from '../src/helpers';

class Policy extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
        };
    }

    render() {
        return(
            <Paper style={{padding:20, margin:20}} zDepth={2}>
                <h2>Policy: {this.props.name}</h2>
                <p>{this.props.description}</p>
                <p><b>Cost:</b> ${this.props.cost}/month</p>
                {this.props.paid ? null : <PolicyPaymentForm applicationID={this.props.applicationID} /> }
            </Paper>
        );
    }
}

class PolicyPaymentForm extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            submitted: false
        };
    }

    submitPayment() {

        let payload = {
            card: {
                number: this.state.cardNumber,
                exp_month: `0${this.state.expirationDate.getMonth()}`.slice(-2),
                exp_year: this.state.expirationDate.getFullYear(),
                cvc: this.secuirtyCode
            }
        };

        axios.post(`/api/applications/${this.props.applicationID}/charge`, payload).then((res) => {
            this.setState({submitted: true, error: null});
        }).catch((e) => {
            console.log(e);
            this.setState({error: e});
        });
    }

    handleChange (source, e, payload) {
        let updateValues = {};
        if (source === "expirationDate") {
            updateValues[source] = new Date(payload);
        } else {
            updateValues[source] = e.target.value;
        }
        this.setState(updateValues);
    }

    render() {
        let disableSubmit = (!(this.state.cardNumber && this.state.securityCode && this.state.expirationDate));

        let content;
        if (!this.state.submitted) {
            content = (
                <div>
                    <TextField ref="cardNumber" floatingLabelText="Credit card" type="number" onChange={this.handleChange.bind(this, "cardNumber")}/>
                    <br/>
                    <TextField ref="securityCode" floatingLabelText="Security code" type="number" onChange={this.handleChange.bind(this, "securityCode")}/>
                    <br/>
                    <DatePicker ref="expirationDate" placeholder="Expiration date"  onChange={this.handleChange.bind(this, "expirationDate")}/>
                    <br/>
                    <RaisedButton ref="submit" label="Submit" onClick={this.submitPayment.bind(this)} disabled={disableSubmit} secondary={true}/>
                </div>
            );
        } else {
            content = (
                <div>
                    <h3>Thank you.  A representative will be in touch.</h3>
                </div>
            );
        }
        return (
            <div>{content}</div>
        );
    }
}

export default Policy;
