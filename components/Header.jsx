import React, { PropTypes, Component } from 'react';

import mui, {AppBar, Styles} from 'material-ui';
import MyRawTheme from '../src/material_ui_raw_theme_file';

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
          <AppBar showMenuIconButton={false} title="Harbor Insurance Co." />
          <h1 style={defaultStyle}>Application</h1>
      </header>
    );
  }
}

Header.propTypes = {
};

export default Header;
