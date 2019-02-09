import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import { ReducerState } from '../../redux-store'
import Pocket from './../pocket/pocket'
import './App.scss';
import {AppProps, Pockets, PocketState, State, Conversion} from './../component-interface'
import { getRates, getBalance, convert } from '../../actions/action'


class App extends React.Component<AppProps, {}> {

  constructor(props: AppProps){
    super(props)
    this.state = {'pocket-from':{'slideIndex': 0}, 'pocket-to':{'slideIndex': 0}}
    const defaultCurrency = 'USD'
    this.props.getRates && this.props.getRates(defaultCurrency)
    this.props.getBalance && this.props.getBalance()
  }

  onSlideChange(pocketContainerClass: string, currency: string) {
    const oldStatePocketContainer = {...(this.state as State)[pocketContainerClass]}
    oldStatePocketContainer.slideIndex = Object.keys(this.props.pockets as Pockets).indexOf(currency)
    this.setState({[pocketContainerClass]: oldStatePocketContainer}, () => {
      if(pocketContainerClass == 'pocket-from')
        this.props.getRates && this.props.getRates(currency.toUpperCase())
    })
  }

  onExchangeInput(pocketContainerClass: string, pocketState: PocketState){
    this.setState({[pocketContainerClass]: pocketState}, () => {
      const fromPocket = (this.state as State)['pocket-from']
      const fromCurrency = Object.keys(this.props.pockets as Pockets)[fromPocket.slideIndex]
      const toPocket = (this.state as State)['pocket-to']
      const toCurrency = Object.keys(this.props.pockets as Pockets)[toPocket.slideIndex]
      if(fromPocket.exchangeValue && fromCurrency && toCurrency)
        this.props.convert && this.props.convert(fromCurrency, toCurrency, fromPocket.exchangeValue)
    })
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
          <Dropdown options={dropdownRates} value={(dropdownRates[0] || {}).value} placeholder="Select an option" />
          <button className='btn-exchange' onClick={this.onExchangeClick.bind(this)}>Exchange</button>
        </header>
        <Pocket containerType='pocket-from' 
          pockets={this.props.pockets as Pockets}
          onSlideChange={this.onSlideChange.bind(this)}
          onExchangeInput={this.onExchangeInput.bind(this)}
        />
        <div className="arrow-down"></div>
        <Pocket 
          containerType='pocket-to'
          value={((this.props.conversion || {}) as Conversion).toValue}
          pockets={this.props.pockets as Pockets}
          onSlideChange={this.onSlideChange.bind(this)}
          onExchangeInput={this.onExchangeInput.bind(this)}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<ReducerState, void, AnyAction>) => ({
  getRates: (defaultCurrency: string) => dispatch(getRates(defaultCurrency)),
  getBalance: () =>  dispatch(getBalance()),
  convert: (fromCurrency: string, toCurrency: string, value: number) => dispatch(convert(fromCurrency, toCurrency, value))
})

const mapStateToProps = (state: ReducerState, ownProps: AppProps) => ({
  ...state.reducer
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
