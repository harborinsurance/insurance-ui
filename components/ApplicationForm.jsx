import React, {Component, PropTypes} from 'react';

import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import LinearProgress from 'material-ui/LinearProgress';


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
        console.log(values);
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
        axios.post('/api/applications', this.state.fieldValues).then((res) =>{
            // transition to "You're done!"
            this.setState({step:5});
        }).catch((e) => {
            console.error(e);
        });
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
            case 5:
                content = <YourDone  paperStyle={paperStyle} containerStyle={containerStyle} />;
                break;
        }
        return (
            <div>
                <h1 style={defaultStyle}>Application</h1>
                <LinearProgress mode="determinate" min={0} max={4} value={this.state.step}/>
                {content}
            </div>
        );
    }

}

export default ApplicationForm;
