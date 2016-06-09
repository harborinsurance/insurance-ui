import React, { Component, PropTypes } from "react";
import Header from '../components/Header';
import ApplicationForm from '../components/ApplicationForm';

class App extends Component {
  render() {
    const { actions } = this.props;
    return (
      <div>
        <Header/>
        <Jumbotron class="bg" type="JumboTron"> </Jumbotron>
      </div>
    );
  }
}


App.propTypes = {

};

export default App;
