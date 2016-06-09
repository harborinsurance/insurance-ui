import React, { Component, PropTypes } from "react";
import Header from '../components/Header';
import ApplicationForm from '../components/ApplicationForm';
import { Grid, Row } from 'react-flexbox-grid/lib/index';
import Box from '../elements/box';

class App extends Component {
  render() {
    const { actions } = this.props;
    return (
      <Grid fluid>
      <Row>
      <Box type="row" xs={12} sm={3} md={2} lg={1} />
      <Box type="row" xs={6} sm={6} md={8} lg={10} />
      <Box type="row" xs={6} sm={3} md={2} lg={1} />
    </Row>
      <div>
        <Header/>
        {this.props.children}
      </div>
      </Grid>
    );
  }
}


App.propTypes = {

};

export default App;
