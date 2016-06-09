import React, { Component, PropTypes } from "react";
import Header from './Header';
import Jumbotron from "../elements/Jumbotron";

class Home extends Component {
  render() {
    const { actions } = this.props;
    return (
      <div>
        <Jumbotron className="bg"> </Jumbotron>
      </div>
    );
  }
}


Home.propTypes = {

};

export default Home;
