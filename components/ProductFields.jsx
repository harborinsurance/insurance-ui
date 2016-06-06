import React, {Component, PropTypes} from 'react';

import mui, {
    TextField,
    SelectField,
    RaisedButton,
    MenuItem,
    Paper
} from 'material-ui';

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

export default ProductFields;
