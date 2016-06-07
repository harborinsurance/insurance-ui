import React, {Component, PropTypes} from 'react';

import mui, {
    TextField,
    SelectField,
    RaisedButton,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableRow,
    TableRowColumn
} from 'material-ui';

class SubmitRentersForm extends Component {
    constructor (props, context) {
        super(props, context);
    }

    submit () {}

    render () {

        const fieldNames = [
            "firstName",
            "lastName",
            "phone",
            "email",
            "streetAddress",
            "streetAddressCont",
            "city",
            "state",
            "zipCode",
            "coverage",
            "ssn"
        ];
        let rows = [];
        for (let fieldName of fieldNames) {
            let fieldTitle = humanizeFieldName(fieldName);
            let fieldValue = this.props.fieldValues[fieldName];
            if (!!fieldValue) {
                rows.push(
                    <TableRow>
                        <TableRowColumn>{fieldTitle}</TableRowColumn>
                        <TableRowColumn>{fieldValue}</TableRowColumn>
                    </TableRow>
                );
            }
        }
        return (
            <div style={this.props.containerStyle}>
                <Paper style={this.props.paperStyle}>
                    <h3>Confirm application details</h3>

                    <Table>
                        <TableBody displayRowCheckbox={false}>
                            {rows}
                        </TableBody>
                    </Table>
                </Paper>
                <RaisedButton className="prev" label="Back" secondary={true} onClick={this.props.prevStep} style={this.props.prevButtonStyle}/>
                <RaisedButton className="next" label="Submit" secondary={true} onClick={this.props.submit} style={this.props.nextButtonStyle}/>
            </div>
        );
    }
}

function humanizeFieldName(camelCase) {
    if (camelCase === null || camelCase === "") {
        return camelCase;
    }

    camelCase = camelCase.trim();
    let newText = "";
    for (let i = 0; i < camelCase.length; i++) {
        if (/[A-Z]/.test(camelCase[i]) && i !== 0 && /[a-z]/.test(camelCase[i - 1])) {
            newText += " ";
        }
        if (i === 0 && /[a-z]/.test(camelCase[i])) {
            newText += camelCase[i].toUpperCase();
        } else {
            newText += camelCase[i].toLowerCase();
        }
    }

    return newText;
}


export default SubmitRentersForm;
