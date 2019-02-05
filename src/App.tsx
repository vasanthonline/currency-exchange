import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { IState } from './redux-store'
import logo from './logo.svg';
import './App.scss';
import { getRates } from './actions/action'


class App extends React.Component<Props, {}> {
  
  getRates = () => {
    console.log('this.props')
    console.log(this.props)
    this.props.getRates()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {JSON.stringify(this.props)}
          </p>
          <button onClick={this.getRates.bind(this)}>
            Get Rates
          </button>
        </header>
      </div>
    );
  }
}

interface Props {
  getRates: Function
}

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, void, AnyAction>) => ({
  getRates: () => dispatch(getRates())
})

const mapStateToProps = (state: object) => ({
  ...state
 })

export default connect(mapStateToProps, mapDispatchToProps)(App);
