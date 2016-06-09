import React, {Component, PropTypes} from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

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
        let updateValues = {};
        if (source === "product") {
            updateValues[source] = "renters";
        } else if (source === "zipCode") {
            if (e.target.value.match(/^\d{5}$/)) {
                this.setState({ errorText: '' });
                updateValues[source] = e.target.value;
            } else {
                this.setState({ errorText: 'This must be a valid zip code.' });
            }
        } else {
            updateValues[source] = e.target.value;
        }
        this.props.updateFields(updateValues);
    }

    render() {
        const zipCodeEnabled = (!!this.props.fieldValues.product);
        const nextDisabled = (!this.props.fieldValues.zipCode);
        return (
            <div style={this.props.containerStyle}>
                <Paper style={this.props.paperStyle} >
                    <h3>Product Information</h3>
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
                    { zipCodeEnabled ? <TextField ref="zipCode" onChange={this.handleChange.bind(this, "zipCode")} value={this.props.fieldValues.zipCode} floatingLabelText="Zip code" type="number"/> : null}
                    <br/>
                </Paper>
                <RaisedButton className="next" label="Next" primary={true} onClick={this.props.nextStep} disabled={nextDisabled} style={this.props.nextButtonStyle}/>
            </div>
        );
    }
}

export default ProductFields;
