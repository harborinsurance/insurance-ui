import React, {Component, PropTypes} from 'react';

import mui, {
    TextField,
    SelectField,
    RaisedButton,
    MenuItem,
    Paper,
    Table,
    TableHeader,
    TableHeaderColumn,
    TableBody,
    TableRow,
    TableRowColumn
} from 'material-ui';

class Admin extends Component {

    constructor(props, context){
        super(props, context);
    }

    render() {

        return(
            <Paper>
                <h1>ADMIN</h1>
                {this.props.children}
            </Paper>
        );
    }
}

export default Admin;
