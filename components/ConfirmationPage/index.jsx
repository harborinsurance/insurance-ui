import React from 'react';
import {Link} from 'react-router';
import './style.scss';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const ConfirmationPage = (props) => {
  return (
    <div>
      <Paper className="confirm">
      <h3>Thank you for your application!</h3>
      <p>We are reviewing your application and will send you a text message once your application has been reviewed.</p>
      </Paper>

      <Link to="/home">
        <RaisedButton
          label="return to home"
          secondary={true}
          className="stepper-nav__btn"
        />
      </Link>
    </div>
  )
};

export default ConfirmationPage;
