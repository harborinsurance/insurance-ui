import React from 'react';
import './style.scss';
import mui, {
    DatePicker,
    TextField,
    SelectField,
    RaisedButton,
    MenuItem,
    Paper
} from 'material-ui';

const ApplicationPage = (props) => {
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
                  this.setState({ errorText: 'This must be a valid zip code.' })
              }
          } else if (source === "dateOfBirth") {
              updateValues[source] = payload;
          }
          else {
              updateValues[source] = e.target.value;
          }
          this.props.updateFields(updateValues);
      }

      const zipCodeEnabled = (!this.props.fieldValues.product);
      const nextDisabled = (!(this.props.fieldValues.zipCode && this.props.fieldValues.firstName && this.props.fieldValues.lastName && this.props.fieldValues.dateOfBirth && this.props.fieldValues.phone && this.props.fieldValues.email && this.props.fieldValues.streetAddress && this.props.fieldValues.city && this.props.fieldValues.state && this.props.fieldValues.zipCode));

  return (
    <div style={this.props.containerStyle}>
    <Paper style={this.props.paperStyle} >
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

        <br/>

        <TextField ref="firstName" floatingLabelText="First name" onChange={this.handleChange.bind(this, "firstName")} value={this.props.fieldValues.firstName}/>
        <br/>
        <TextField ref="lastName" floatingLabelText="Last name" onChange={this.handleChange.bind(this, "lastName")} value={this.props.fieldValues.lastName}/>
        <br />
        <br />
        <DatePicker ref="dateOfBirth" placeholder="Date of birth (mm/dd/yyyy)" defaultDate={new Date("2000")} onChange={this.handleChange.bind(this, "dateOfBirth")} value={this.props.fieldValues.dateOfBirth}/>
        <br/>
        <TextField ref="phone" floatingLabelText="Phone" onChange={this.handleChange.bind(this, "phone")} value={this.props.fieldValues.phone} type="tel"/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <TextField ref="email" floatingLabelText="Email" onChange={this.handleChange.bind(this, "email")} value={this.props.fieldValues.email} type="email"/>
        <br />
        <TextField floatingLabelText="Street address" onChange={this.handleChange.bind(this, "streetAddress")} value={this.props.fieldValues.streetAddress}/>
        <br />
        <TextField floatingLabelText="Street address cont." onChange={this.handleChange.bind(this, "streetAddressCont")} value={this.props.fieldValues.streetAddressCont}/>
        <br />
        <TextField floatingLabelText="City" onChange={this.handleChange.bind(this, "city")} value={this.props.fieldValues.city}/>
        <br />
        <TextField floatingLabelText="State" onChange={this.handleChange.bind(this, "state")} value={this.props.fieldValues.state}/>
        <br />
        <TextField floatingLabelText="Zip code" onChange={this.handleChange.bind(this, "zipCode")} value={this.props.fieldValues.zipCode}/>
    </Paper>
    <RaisedButton className="prev" label="Back" secondary={true} onClick={this.props.prevStep} style={this.props.prevButtonStyle}/>
    <RaisedButton className="next" label="Next" secondary={true} onClick={this.props.nextStep} disabled={nextDisabled} style={this.props.nextButtonStyle}/>
</div>
  )
};

export default ApplicationPage;
