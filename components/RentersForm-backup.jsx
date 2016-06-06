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


const defaultStyle = {
    margin: 20,
    padding: 20,
    maxWidth: 300
};

class RentersForm extends Component {
    constructor (props, context) {
        super(props, context);
        this.state = {
            step: 2,
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
        console.log(this);
        let newStep = Math.min(this.state.step + 1, 4);
        this.setState({step:newStep});
    }

    prevStep() {
        let newStep = Math.max(this.state.step - 1, 1);
        this.setState({step:newStep});
    }

    render () {
        let fields;
        switch(this.state.step) {
            case 1:
                fields = <ProductFields fieldValues={this.state.fieldValues}  nextStep={this.nextStep.bind(this)} updateFields={this.updateFields.bind(this)}/>;
                break;
            case 2:
                fields = <PersonalFields fieldValues={this.state.fieldValues} nextStep={this.nextStep.bind(this)} prevStep={this.prevStep.bind(this)} updateFields={this.updateFields.bind(this)}/>;
                break;
            case 3:
                fields = <AddressFields fieldValues={this.state.fieldValues} nextStep={this.nextStep.bind(this)} prevStep={this.prevStep.bind(this)} updateFields={this.updateFields.bind(this)}/>;
                break;
            case 4:
                fields = <CoverageFields fieldValues={this.state.fieldValues} prevStep={this.prevStep.bind(this)}  updateFields={this.updateFields.bind(this)}/>;
                break;
        }
        return (
            <div>
                <LinearProgress mode="determinate" min={0} max={4} value={this.state.step - 1}/>
                {fields}
            </div>
        );
    }

}

export default RentersForm;
