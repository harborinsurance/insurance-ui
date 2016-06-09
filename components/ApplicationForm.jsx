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
  StepContent,
  StepLabel
} from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';

import ApplicationPage from '../components/ApplicationPage';
import CoveragePage from '../components/CoveragePage';
import SummaryPage from '../components/SummaryPage';


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

    componentWillMount = () => {
      this.updateDimensions();
    }

    componentDidMount = () => {
      window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount = () => {
      window.removeEventListener('resize', this.updateDimensions);
    }

    handleChange = (evt, value) => {
      this.setState({
        fieldValues: {
          [evt.target.name]: value
        }
      });
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

      if (step === 2) {
        axios.post('/api/applications', this.state.fieldValues)
          .then(res => {
            this.context.router.push('/confirmation');
          })
          .catch(err => console.log(err));
      }

      if (step < 3) {
        this.setState({
          step: step + 1,
          finished: step >= 2
        });
      }
    }

    handlePrev = () => {
      const { step } = this.state;

      if (step > 0) {
        this.setState({
          step: step - 1
        });
      }
    }

    updateDimensions = () => {
      const width = window.innerWidth;

      this.setState({
        width: width
      });
    }

    render () {
      const { step } = this.state;
      let stepContent;

      if (step === 0) {
        stepContent = (<ApplicationPage handleChange={this.handleChange} />);
      } else if (step === 1) {
        stepContent = (<CoveragePage handleChange={this.handleChange} />);
      } else if (step === 2) {
        stepContent = (<SummaryPage handleChange={this.handleChange} />);
      }

      let content = (this.state.width > 500) ? (
      <div>
        <Stepper key="verticalStep" activeStep={step}>
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

        {stepContent}

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
      ): (
        <div>
          <Stepper key="horizontalStep" activeStep={step} orientation="vertical">
            <Step>
              <StepLabel>Application</StepLabel>
              <StepContent>
                <ApplicationPage handleChange={this.handleChange} />
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Coverage</StepLabel>
              <StepContent>
                <CoveragePage handleChange={this.handleChange} />
              </StepContent>
            </Step>
            <Step>
              <StepLabel>
                <SummaryPage handleChange={this.handleChange} />
              </StepLabel>
            </Step>
          </Stepper>

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
      );

      return (
        <Paper style={paperStyle}>
          {content}
        </Paper>
      );
    }

}

ApplicationForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default ApplicationForm;
