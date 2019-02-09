import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import { IState } from '../../redux-store'
import Pocket from './../pocket/pocket'
import './App.scss';
import {AppProps} from './../component-interface'
import { getRates } from '../../actions/action'


class App extends React.Component<AppProps, {}> {

  constructor(props: AppProps){
    super(props)
    this.state = {'pocket-from':{'slideIndex': 0}, 'pocket-to':{'slideIndex': 0}}
    const defaultCurrency = 'USD'
    this.props.getRates(defaultCurrency)
  }

  onSlideChange(pocketContainer: string, currency: string) {
    if(pocketContainer == 'pocket-from')
      this.props.getRates(currency.toUpperCase())
  }

  onRateSelect() {

  }

  onClearClick() {

  }

  onExchangeClick() {

  }

  render() {
    const dropdownRates = (this.props.rates || []).map((rate) => {
      return {'label': `${rate.fromSymbol}${rate.fromValue} = ${rate.toSymbol}${rate.toValue}`, value: `${rate.fromCurrency}_${rate.toCurrency}`}
    })

    return (
      <div className="app">
        <header className="app-header">
          <button className='btn-cancel' onClick={this.onClearClick.bind(this)}>Clear</button>
          <Dropdown options={dropdownRates} onChange={this.onRateSelect.bind(this)} value={(dropdownRates[0] || {}).value} placeholder="Select an option" />
          <button className='btn-exchange' onClick={this.onExchangeClick.bind(this)}>Exchange</button>
        </header>
        <Pocket containerType='pocket-from' pockets={this.props.pockets} onSlideChange={this.onSlideChange.bind(this)} />
        <div className="arrow-down"></div>
        <Pocket containerType='pocket-to' pockets={this.props.pockets} onSlideChange={this.onSlideChange.bind(this)}  />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, void, AnyAction>) => ({
  getRates: (defaultCurrency: string) => dispatch(getRates(defaultCurrency))
})

const mapStateToProps = (state: any) => {
  return {'rates': state.reducer.status == 1 ? state.reducer.payload : []}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
