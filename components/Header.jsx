import React, { PropTypes, Component } from 'react';



import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

import Logos from "../elements/Logos";


class Header extends Component {
  render() {
    return (
      <header className="header">
          <AppBar title="" iconElementLeft={<IconButton><Logos type="150" /></IconButton>}/>
      </header>
    );
  }
}

export default Header;
