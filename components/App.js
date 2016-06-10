import React, { Component, PropTypes } from "react";
import Header from '../components/Header';
import ApplicationForm from '../components/ApplicationForm';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    const { actions } = this.props;
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <Header/>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}


export default App;
