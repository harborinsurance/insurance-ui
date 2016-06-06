import React, { Component, PropTypes } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import RentersForm from '../components/RentersForm';
import * as RentersApplicationActions from '../actions/rentersApplication';

class App extends Component {
  render() {
    const { actions } = this.props;
    return (
      <div>
        <Header/>
        <RentersForm/>
      </div>
    );
  }
}


App.propTypes = {
};

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
