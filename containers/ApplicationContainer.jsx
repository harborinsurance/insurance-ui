import React, { Component, PropTypes } from "react";
import Header from '../components/Header';
import ApplicationForm from '../components/ApplicationForm';

class Application extends Component {
  render() {
    const { actions } = this.props;
    return (
      <div>
        <Header/>

      </div>
    );
  }
}


Application.propTypes = {

};

export default Application;
