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
  padding: 20,
  borderRadius: '14px',
  border: '1px #c8c8c8 solid',
  boxShadow: 'none',
  backgroundColor: 'white'
};

class ApplicationForm extends Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        step: 0,
        finished: false,
        fieldValues: {
          product: '',
          zipCode: '',
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          streetAddress: '',
          streetAddressCont: '',
          city: '',
          state: '',
          dateOfBirth: '',
          coverage: '',
          socialSecurityNumber: ''
        }
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

    handleChange = (evt, value, select) => {
      let propName;

      if (select) {
        propName = select;
      } else {
        propName = evt.target.name;
      }

      const fieldValues = Object.assign(this.state.fieldValues, {
        [propName]: value
      })

      this.setState({
        fieldValues: fieldValues
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

      if (step < 2) {
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
      const { fieldValues } = this.state;
      let stepContent;

      if (step === 0) {
        stepContent = (<ApplicationPage handleChange={this.handleChange} fieldValues={fieldValues} />);
      } else if (step === 1) {
        stepContent = (<CoveragePage handleChange={this.handleChange} fieldValues={this.state.fieldValues} />);
      } else if (step === 2) {
        stepContent = (<SummaryPage handleChange={this.handleChange} fieldValues={this.state.fieldValues} />);
      }

      let content = (this.state.width > 500) ? (
      <div>
        <Stepper key="horizontalStep" activeStep={step}>
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
          <Stepper key="verticalStep" activeStep={step} orientation="vertical">
            <Step>
              <StepLabel>Application</StepLabel>
              <StepContent>
                <ApplicationPage handleChange={this.handleChange} fieldValues={fieldValues} />
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Coverage</StepLabel>
              <StepContent>
                <CoveragePage handleChange={this.handleChange} fieldValues={this.state.fieldValues} />
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Summary</StepLabel>
              <StepContent>
                <SummaryPage handleChange={this.handleChange} fieldValues={this.state.fieldValues} />
              </StepContent>
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
        <Paper style={paperStyle} className="paper-override">
          {content}
        </Paper>
      );
    }

}

ApplicationForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default ApplicationForm;
