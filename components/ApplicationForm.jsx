import React, {Component, PropTypes} from 'react';
import mui, {
    DatePicker,
    TextField,
    SelectField,
    RaisedButton,
    Divider,
    MenuItem,
    Paper,
    LinearProgress
} from 'material-ui';
import ProductFields from '../components/ProductFields';
import PersonalFields from '../components/PersonalFields';
import AddressFields from '../components/AddressFields';
import CoverageFields from '../components/CoverageFields';
import SubmitApplicationForm from '../components/SubmitApplicationForm';


const containerStyle = {
    maxWidth: 350
};

const paperStyle = {
    margin: 20,
    padding: 20
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
            step: 0,
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

        let newStep = Math.min(this.state.step + 1, 4);
        this.setState({step:newStep});
    }

    prevStep() {
        let newStep = Math.max(this.state.step - 1, 0);
        this.setState({step:newStep});
    }

    submit() {
        // make request / kick off action with fieldValues
    }

    render () {
        let content;
        switch(this.state.step) {
            case 0:
                content = <ProductFields paperStyle={paperStyle} containerStyle={containerStyle} prevButtonStyle={prevButtonStyle} nextButtonStyle={nextButtonStyle} fieldValues={this.state.fieldValues}  nextStep={this.nextStep.bind(this)} updateFields={this.updateFields.bind(this)}/>;
                break;
            case 1:
                content = <PersonalFields paperStyle={paperStyle} containerStyle={containerStyle} prevButtonStyle={prevButtonStyle} nextButtonStyle={nextButtonStyle} fieldValues={this.state.fieldValues} nextStep={this.nextStep.bind(this)} prevStep={this.prevStep.bind(this)} updateFields={this.updateFields.bind(this)}/>;
                break;
            case 2:
                content = <AddressFields paperStyle={paperStyle} containerStyle={containerStyle} prevButtonStyle={prevButtonStyle} nextButtonStyle={nextButtonStyle} fieldValues={this.state.fieldValues} nextStep={this.nextStep.bind(this)} prevStep={this.prevStep.bind(this)} updateFields={this.updateFields.bind(this)}/>;
                break;
            case 3:
                content = <CoverageFields paperStyle={paperStyle} containerStyle={containerStyle} prevButtonStyle={prevButtonStyle} nextButtonStyle={nextButtonStyle} fieldValues={this.state.fieldValues} nextStep={this.nextStep.bind(this)} prevStep={this.prevStep.bind(this)}  updateFields={this.updateFields.bind(this)}/>;
                break;
            case 4:
                content = <SubmitApplicationForm  paperStyle={paperStyle} containerStyle={containerStyle} prevButtonStyle={prevButtonStyle} nextButtonStyle={nextButtonStyle} fieldValues={this.state.fieldValues} prevStep={this.prevStep.bind(this)}  submit={this.submit.bind(this)}/>;
                break;
        }
        return (
            <div>
                <LinearProgress mode="determinate" min={0} max={4} value={this.state.step}/>
                {content}
            </div>
        );
    }

}

export default ApplicationForm;
