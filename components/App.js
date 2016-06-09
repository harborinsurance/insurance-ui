import React, { Component, PropTypes } from "react";
import Header from '../components/Header';
import ApplicationForm from '../components/ApplicationForm';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Colors from 'material-ui/styles/colors';
import ColorManipulator from 'material-ui/utils/colorManipulator';
import Spacing from 'material-ui/styles/spacing';

let harborColors = {
  darkblue: '#3A6E9A',
  lightblue: '#3DCCDB',
  offwhite: '#F0F1F2',
  grey: '#223A50'
}

const muiTheme = getMuiTheme({
  spacing: Spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: harborColors.darkblue,
    primary2Color: harborColors.darkblue,
    primary3Color: harborColors.darkblue,
    accent1Color: harborColors.lightblue,
    accent2Color: harborColors.lightblue,
    accent3Color: harborColors.lightblue,
    textColor: harborColors.grey,
    alternateTextColor: '#ffffff',
    canvasColor: harborColors.offwhite,
    borderColor: '#90a4ae'
    // disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3)
  }
});

class App extends Component {
  render() {
    const { actions } = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Header/>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
