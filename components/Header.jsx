import React, { PropTypes, Component } from 'react';

import mui, {AppBar, Styles, IconButton} from 'material-ui';
import MyRawTheme from '../src/material_ui_raw_theme_file';
import Logos from "../elements/Logos";

let NavigationClose = require('material-ui/lib/svg-icons/navigation/close');

const defaultStyle = {
  marginLeft: 20
};

class Header extends Component {
  static get childContextTypes() {
    return { muiTheme: React.PropTypes.object };
  }

  getChildContext(){
    return {  muiTheme: Styles.ThemeManager.getMuiTheme(MyRawTheme)};
  }

  render() {
    return (
      <header className="header">
          <AppBar title="" iconElementLeft={<IconButton><Logos type="150" /></IconButton>}/>
      </header>
    );
  }
}

Header.propTypes = {
};

export default Header;
