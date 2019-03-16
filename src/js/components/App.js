import React, { Component, Fragment } from "react";
import './App.scss';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { startSession, endSession } from 'modules/navigation';

class App extends Component {
  componentDidMount() {
    this.props.startSession();
    this.setupBeforeUnloadListener();
  }

  doBeforeUnload = () => {
    this.props.endSession();
  }

  setupBeforeUnloadListener = () => {
    window.addEventListener("beforeunload", (ev) => {
        ev.preventDefault();
        return this.doBeforeUnload();
    });
  };

  render() {
    return (
      <div className="container">
        <Switch>

        </Switch>
        <footer className="footer fixed-bottom pb-1 bg-white-50">
          <div className="container text-right">
            <span className="small text-muted">v{APP_VERSION_NUMBER}, built on {BUILD_DATE} at {BUILD_TIMESTAMP} (UTC)</span>
          </div>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => {
  return {
    startSession: () => dispatch(startSession()),
    endSession: () => dispatch(endSession())
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App)
);
