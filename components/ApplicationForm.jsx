import React, {Component, PropTypes} from 'react';
import mui, {
    DatePicker,
    TextField,
    SelectField,
    RaisedButton,
    Divider,
    MenuItem,
    Paper,
    LinearProgress,
    AppBar,
    Stepper,
    Step,
    StepLabel,
    StepContent
} from 'material-ui';
import axios from 'axios';
import ProductFields from '../components/ProductFields';
import PersonalFields from '../components/PersonalFields';
import AddressFields from '../components/AddressFields';
import CoverageFields from '../components/CoverageFields';
import SubmitApplicationForm from '../components/SubmitApplicationForm';
import YourDone from '../components/YourDone';


const containerStyle = {
    maxWidth: 350
};

const defaultStyle = {
  marginLeft: 20
};

const paperStyle = {
    margin: 20,
    padding: 20,
    alignSelf: "center",
    zDepth: 1
};

const nextButtonStyle = {
    float: "right",
    marginRight: 20
};

const prevButtonStyle = {
    float: "left",
    marginLeft: 20
};

class ApplicationForm extends Component {
    constructor (props, context) {
        super(props, context);
        this.state = {
            stepIndex: 0,
            fieldValues: {
            }
        };
    }

    updateFields(values) {
        let newFieldValues = Object.assign({}, this.state.fieldValues, values);
        let newState = Object.assign({}, this.state, {fieldValues: newFieldValues});
        this.setState(newState);
    }

    nextStep() {

        const newStep = Math.min(this.state.stepIndex + 1, 4);
        this.setState({stepIndex:newStep});
    }

    prevStep() {
        const newStep = Math.max(this.state.stepIndex - 1, 0);
        this.setState({stepIndex:newStep});
    }

    submit() {
        console.log(this.state.fieldValues);
        axios.post('/api/applications', this.state.fieldValues).then((res) =>{
            // transition to "You're done!"
            this.setState({stepIndex:5});
        }).catch((e) => {
            console.error(e);
        });
    }

    render () {
        let content;

        const { stepIndex } = this.state;

        return (
            <div style={{display: "flex", justifyContent: "spaceAround"}}>
                <Paper style={{margin: "auto", marginTop: 40, paddingBottom: 40}}>
                    <AppBar title="Application" showMenuIconButton={false}/>
                    <Stepper activeStep={stepIndex} orientation="vertical">
                        <Step>
                            <StepLabel>Select Product</StepLabel>
                            <StepContent>
                                <ProductFields paperStyle={paperStyle} containerStyle={containerStyle} prevButtonStyle={prevButtonStyle} nextButtonStyle={nextButtonStyle} fieldValues={this.state.fieldValues}  nextStep={this.nextStep.bind(this)} updateFields={this.updateFields.bind(this)}/>
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>Enter Personal Information</StepLabel>
                            <StepContent>
                                <PersonalFields paperStyle={paperStyle} containerStyle={containerStyle} prevButtonStyle={prevButtonStyle} nextButtonStyle={nextButtonStyle} fieldValues={this.state.fieldValues} nextStep={this.nextStep.bind(this)} prevStep={this.prevStep.bind(this)} updateFields={this.updateFields.bind(this)}/>
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>Enter Address Information</StepLabel>
                            <StepContent>
                                <AddressFields paperStyle={paperStyle} containerStyle={containerStyle} prevButtonStyle={prevButtonStyle} nextButtonStyle={nextButtonStyle} fieldValues={this.state.fieldValues} nextStep={this.nextStep.bind(this)} prevStep={this.prevStep.bind(this)} updateFields={this.updateFields.bind(this)}/>
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>Enter Coverage Information</StepLabel>
                            <StepContent>
                                <CoverageFields paperStyle={paperStyle} containerStyle={containerStyle} prevButtonStyle={prevButtonStyle} nextButtonStyle={nextButtonStyle} fieldValues={this.state.fieldValues} nextStep={this.nextStep.bind(this)} prevStep={this.prevStep.bind(this)}  updateFields={this.updateFields.bind(this)}/>
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>Review Application</StepLabel>
                            <StepContent>
                                <SubmitApplicationForm  paperStyle={paperStyle} containerStyle={containerStyle} prevButtonStyle={prevButtonStyle} nextButtonStyle={nextButtonStyle} fieldValues={this.state.fieldValues} prevStep={this.prevStep.bind(this)}  submit={this.submit.bind(this)}/>
                            </StepContent>
                        </Step>
                    </Stepper>

                </Paper>
            </div>
        );
    }
}

export default ApplicationForm;
