import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import _ from 'lodash';
import numeral from 'numeral';
import faker from 'faker';
import axios from 'axios';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Stepper, Step, StepLabel, StepContent} from 'material-ui/Stepper';

import { makeFakeApplications } from '../src/helpers';

class Policy extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            stepIndex: 0,
            submitted: false
        };
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

    handleNext() {
       const {stepIndex} = this.state;
       this.setState({
         stepIndex: stepIndex + 1,
         finished: stepIndex >= 2
       });
     }

     handlePrev() {
       const {stepIndex} = this.state;
       if (stepIndex > 0) {
         this.setState({stepIndex: stepIndex - 1});
       }
     }

     renderStepActions(step) {
       const {stepIndex} = this.state;

       return (
         <div style={{margin: '12px 0'}}>
           <RaisedButton
             label={stepIndex === 2 ? 'Finish' : 'Next'}
             disableTouchRipple={true}
             disableFocusRipple={true}
             primary={true}
             onTouchTap={this.handleNext}
             style={{marginRight: 12}}
           />
           {step > 0 && (
             <FlatButton
               label="Back"
               disabled={stepIndex === 0}
               disableTouchRipple={true}
               disableFocusRipple={true}
               onTouchTap={this.handlePrev}
             />
           )}
         </div>
       );
     }

     submitPayment() {
         this.setState({submitted:true});
         let payload = {
             card: {
                 number: this.state.cardNumber,
                 exp_month: `0${this.state.expMonth}`.slice(-2),
                 exp_year: `20${this.state.expYear}`.slice(-4),
                 cvc: this.secuirtyCode
             }
         };

         axios.post(`/api/applications/${this.props.applicationID}/charge`, payload).then((res) => {
             this.handleNext();
         }).catch((e) => {
             this.setState({error: e});
         });
     }


    render() {
        const {stepIndex} = this.state;
        const disableSubmit = (!(this.state.cardNumber && this.state.securityCode && this.state.expMonth && this.state.expYear)) || this.state.submitted;
        return(
            <div>
                <h2 style={{padding:20}}>Your application has been approved!</h2>
                <Stepper activeStep={stepIndex} orientation="vertical">
                    <Step>
                        <StepLabel>Review Policy</StepLabel>
                        <StepContent>
                            <h3>Policy: {this.props.name}</h3>
                            <p>{this.props.description}</p>
                            <RaisedButton className="next" label="Next" primary={true} onClick={this.handleNext.bind(this)} />
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Submit Payment</StepLabel>
                        <StepContent>
                            <div>
                                <TextField ref="cardNumber" floatingLabelText="Credit card" type="number" onChange={this.handleChange.bind(this, "cardNumber") } value={this.state.cardNumber}/>
                                <br/>
                                <TextField ref="securityCode" floatingLabelText="Security code" type="number" onChange={this.handleChange.bind(this, "securityCode") } value={this.state.securityCode}/>
                                <br/>
                                <TextField ref="expMonth" floatingLabelText="Expiration Month" type="number" onChange={this.handleChange.bind(this, "expMonth") } value={this.state.expMonth}/>
                                <br />
                                <TextField ref="expYear" floatingLabelText="Expiration Year" type="number" onChange={this.handleChange.bind(this, "expYear") } value={this.state.expYear}/>
                                <br />
                                <br />
                                <div style={{display:"flex"}}>
                                    <RaisedButton style={{marginRight:10}} className="prev" label="Back" secondary={true} onClick={this.handlePrev.bind(this)}/>
                                    <RaisedButton style={{marginLeft:10}} ref="submit" label="Submit" onClick={this.submitPayment.bind(this)} disabled={disableSubmit} primary={true}/>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Complete</StepLabel>
                        <StepContent>
                            <h2>A representative will be in touch.</h2>
                        </StepContent>
                    </Step>
                </Stepper>
            </div>
        );
    }
}

export default Policy;
