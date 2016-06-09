import React, {Component, PropTypes} from 'react';

import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import LinearProgress from 'material-ui/LinearProgress';
import {
  Step,
  Stepper,
  StepLabel
} from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';

import axios from 'axios';

const paperStyle = {
    margin: 20,
    padding: 20
};

class ApplicationForm extends Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        step: 0,
        finished: false,
        fieldValues: {}
      };
    }

    updateFields = (values) => {
      let newFieldValues = Object.assign({}, this.state.fieldValues, values);
      let newState = Object.assign({}, this.state, {fieldValues: newFieldValues});
      this.setState({newState});
    }

    handleNext = () => {
      // if not the final step, progress stepping
      // otherwise, submit the form
      const { step } = this.state;

      if (step === 0) {
        this.context.router.push('/apply/coverage');
      } else if (step === 1) {
        this.context.router.push('/apply/summary');
      } else if (step === 2) {
        // axios.post('/api/applications', this.state.fieldValues).then((res) =>{
        //   // Finished state
        //   this.context.router.push('/apply/confirmation');
        // }).catch(err => {
        //   console.error(err);
        // });
        this.context.router.push('/confirmation');
        return;
      }

      this.setState({
        step: step + 1,
        finished: step >= 2
      });
    }

    handlePrev = () => {
      const { step } = this.state;

      if (step > 0) {
        this.setState({
          step: step - 1
        });
      }
    }

    render () {
      const { step } = this.state;

      return (
        <Paper style={paperStyle}>
          <div>
            <Stepper activeStep={step}>
              <Step>
                <StepLabel>Application</StepLabel>
              </Step>
              <Step>
                <StepLabel>Coverage</StepLabel>
              </Step>
              <Step>
                <StepLabel>Summary</StepLabel>
              </Step>
            </Stepper>
            {this.props.children}

            <div className="stepper-nav">
              <FlatButton
                label="Back"
                disabled={step === 0}
                onTouchTap={this.handlePrev}
                className="stepper-nav__btn"
              />

              <RaisedButton
                label={step === 2 ? 'Submit' : 'Next'}
                primary
                onTouchTap={this.handleNext}
                className="stepper-nav__btn"
              />
            </div>
          </div>
        </Paper>
      );
    }

}

ApplicationForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default ApplicationForm;
