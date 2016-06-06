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

const defaultStyle = {
    margin: 20,
    padding: 20,
    maxWidth: 300
};

class RentersForm extends Component {
    constructor (props, context) {
        super(props, context);
        this.state = {
            step: 1,
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

class ProductFields extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    updateProduct() {
        this.props.updateFields({
            product: "renters"
        });
    }

    handleChange(source, e, payload) {
        let updateValues = [];
        if (source === "product") {
            updateValues[source] = "renters";
        } else {
            updateValues[source] = e.target.value;
        }
        this.props.updateFields(updateValues);
    }

    render() {
        const zipCodeEnabled = (!!this.props.fieldValues.product);
        const nextDisabled = (!this.props.fieldValues.zipCode);
        return (
            <Paper style={defaultStyle} >

                <SelectField ref="product" onChange={this.handleChange.bind(this, "product")} value={this.props.fieldValues.product} floatingLabelText="Product">
                    <MenuItem value={"autos"} disabled={true} primaryText="Autos"/>
                    <MenuItem value={"boat"} disabled={true} primaryText="Boat"/>
                    <MenuItem value={"renters"} disabled={false} primaryText="Renters"/>
                    <MenuItem value={"homeOwner"} disabled={true} primaryText="Home Owner"/>
                    <MenuItem value={"oversease"} disabled={true} primaryText="Overseas"/>
                    <MenuItem value={"pet"} disabled={true} primaryText="Pet"/>
                    <MenuItem value={"jewelry"} disabled={true} primaryText="Jewelry"/>
                    <MenuItem value={"rv"} disabled={true} primaryText="RV"/>
                </SelectField>
                { zipCodeEnabled ? <TextField ref="zipCode" onChange={this.handleChange.bind(this, "zipCode")} floatingLabelText="Zip code" type="number"/> : null}
                <br/>
                <RaisedButton className="next" label="Next" secondary={true} onClick={this.props.nextStep} disabled={nextDisabled}/>
            </Paper>
        );
    }
}


class PersonalFields extends Component {

    handleChange(source, e, payload) {
        let updateValues = [];
        if (source === "birthDate") {
            updateValues[source] = payload;
        } else {
            updateValues[source] = e.target.value;
        }
        this.props.updateFields(updateValues);
    }

    render() {
        const nextDisabled = (!(this.props.fieldValues.firstName && this.props.fieldValues.lastName && this.props.fieldValues.birthDate));
        return (
            <Paper style={defaultStyle}>

                <TextField ref="firstName" floatingLabelText="First name" onChange={this.handleChange.bind(this, "firstName")}/>
                <br />
                <TextField ref="lastName" floatingLabelText="Last name" onChange={this.handleChange.bind(this, "lastName")}/>
                <br/>
                <DatePicker ref="birthDate" placeholder="Date of birth" mode="landscape" onChange={this.handleChange.bind(this, "birthDate")}/>
                <br/>

                <RaisedButton className="next" label="Next" secondary={true} onClick={this.props.nextStep} disabled={nextDisabled}/>

            </Paper>
        );
    }
}

class AddressFields extends Component {

    handleChange(source, e, payload) {
        let updateValues = [];
        updateValues[source] = e.target.value;
        this.props.updateFields(updateValues);
    }

    render() {
        const nextDisabled = (!(this.props.fieldValues.street1 && this.props.fieldValues.street2 && this.props.fieldValues.city && this.props.fieldValues.state && this.props.fieldValues.zipCode));

        return (
            <Paper style={defaultStyle}>

                <TextField floatingLabelText="Street address" onChange={this.handleChange.bind(this, "street1")}/>
                <br />
                <TextField floatingLabelText="Street address cont." onChange={this.handleChange.bind(this, "street2")}/>
                <br />
                <TextField floatingLabelText="City" onChange={this.handleChange.bind(this, "city")}/>
                <br />
                <TextField floatingLabelText="State" onChange={this.handleChange.bind(this, "state")}/>
                <br />
                <TextField floatingLabelText="Zip code" type="number" value={this.props.fieldValues.zipCode} onChange={this.handleChange.bind(this, "zipCode")}/>
                <br />
                <RaisedButton className="next" label="Next" secondary={true} disabled={nextDisabled} onClick={this.props.nextStep}/>
            </Paper>
        );
    }
}

class CoverageFields extends Component {
    handleChange(source, e, payload) {
        let updateValues = [];
        updateValues[source] = e.target.value;
        this.props.updateFields(updateValues);
    }


    render () {
        const ssnEnabled = this.props.fieldValues.coverage && this.props.fieldValues.coverage >= 100000;
        const nextDisabled = (!(this.props.fieldValues.coverage && (ssnEnabled ? this.props.ssn : true)));
        return (
            <Paper style={defaultStyle}>
                <TextField floatingLabelText="Coverage amount" type="number" onChange={this.handleChange.bind(this, "coverage")}/>
                {ssnEnabled ? <TextField floatingLabelText="Social security" type="number" onChange={this.handleChange.bind(this, "ssn")}/> : null}
                <RaisedButton className="next" label="Next" secondary={true} disabled={nextDisabled} onClick={this.props.nextStep}/>
            </Paper>
        );
    }
}


export default RentersForm;
