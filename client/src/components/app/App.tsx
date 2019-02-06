import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import { IState } from '../../redux-store'
import logo from './logo.svg';
import './App.scss';
import { getRates } from '../../actions/action'


class App extends React.Component<Props, {}> {

  constructor(props: Props){
    super(props)
    this.state = {'slideIndex': 0}
  }

  getRates = () => {
    this.props.getRates()
  }

  moveToSlide(ev: any) {
    const slideIndex = [...ev.target.parentElement.children].indexOf(ev.target)
    const pocketContainerClass = ev.target.parentElement.parentElement.className
    if(slideIndex >= 0){
      this.showSlide(slideIndex, pocketContainerClass)
    }
  }

  showSlide(n: number, pocketContainerClass: string) {
    var slides = document.querySelectorAll(`.${pocketContainerClass} .pocket-container`);
    var dots = document.querySelectorAll(`.${pocketContainerClass} .dot`);
    
    for(let i = 0; i < slides.length; i++)
      slides[i].className = slides[i].className.replace(' active', '');
    for(let i = 0; i < dots.length; i++)
      dots[i].className = dots[i].className.replace(' active', '');

    const slideIndex = n >= slides.length ? 0 : (n < 0 ? slides.length - 1 : n)
    this.setState({'slideIndex': slideIndex}, () => {
      slides[(this.state as State).slideIndex].className += ' active';
      dots[(this.state as State).slideIndex].className += ' active';
    })
  }

  onRateSelect() {

  }

  onCancelClick() {

  }

  onExchangeClick() {

  }

  render() {
    const rates = [
      {'fromCurrency': 'USD', 'fromSymbol': '$', 'fromValue': 1, 'toCurrency': 'GBP', 'toSymbol': '£', 'toValue': 7.55},
      {'fromCurrency': 'USD', 'fromSymbol': '$', 'fromValue': 1, 'toCurrency': 'EUR', 'toSymbol': '€', 'toValue': 9.15},
      {'fromCurrency': 'GBP', 'fromSymbol': '£', 'fromValue': 1, 'toCurrency': 'EUR', 'toSymbol': '€', 'toValue': 1.15},
      {'fromCurrency': 'GBP', 'fromSymbol': '£', 'fromValue': 1, 'toCurrency': 'USD', 'toSymbol': '$', 'toValue': 0.75},
      {'fromCurrency': 'EUR', 'fromSymbol': '€', 'fromValue': 1, 'toCurrency': 'USD', 'toSymbol': '$', 'toValue': 0.63},
      {'fromCurrency': 'EUR', 'fromSymbol': '€', 'fromValue': 1, 'toCurrency': 'GBP', 'toSymbol': '£', 'toValue': 0.90}
    ]
    const dropdownRates = rates.map((rate) => {
      return {'label': `${rate.fromSymbol}${rate.fromValue} = ${rate.toSymbol}${rate.toValue}`, value: `${rate.fromCurrency}_${rate.toCurrency}`}
    })
    const pockets = [
      {'currency': 'USD', 'symbol': '$', 'balance': 45.30},
      {'currency': 'GBP', 'symbol': '£', 'balance': 200.10},
      {'currency': 'EUR', 'symbol': '€', 'balance': 25.75}
    ]
    return (
      <div className="app">
        <header className="app-header">
          <button className='btn-cancel' onClick={this.onCancelClick.bind(this)}>Cancel</button>
          <Dropdown options={dropdownRates} onChange={this.onRateSelect} value={dropdownRates[0].value} placeholder="Select an option" />
          <button className='btn-exchange' onClick={this.onExchangeClick.bind(this)}>Exchange</button>
        </header>
        <div className="pocket-from">
          {pockets.map((pocket, index) => {
            return (<div key={index} className={index == 0 ? 'pocket-container active' : 'pocket-container'}>
              <label>{pocket.currency}</label>
              <h3>You have {pocket.symbol}{pocket.balance}</h3>
            </div>)
          })}
          <div className="dots">
            {pockets.map((pocket, index) => {
              return (<button  key={index}
                className={index == 0 ? 'dot active' : 'dot'}
                onClick={this.moveToSlide.bind(this)}>
              </button>)
            })}
          </div>
        </div>
        <div className="pocket-to">
          {pockets.map((pocket, index) => {
            return (<div key={index} className={index == 0 ? 'pocket-container active' : 'pocket-container'}>
              <label>{pocket.currency}</label>
              <h3>You have {pocket.symbol}{pocket.balance}</h3>
            </div>)
          })}
          <div className="dots">
            {pockets.map((pocket, index) => {
              return (<button  key={index}
                className={index == 0 ? 'dot active' : 'dot'}
                onClick={this.moveToSlide.bind(this)}>
              </button>)
            })}
          </div>
        </div>
      </div>
    );
  }
}

interface Props {
  getRates: Function
}

interface State {
  slideIndex: number
}

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, void, AnyAction>) => ({
  getRates: () => dispatch(getRates())
})

const mapStateToProps = (state: object) => ({
  ...state
 })

export default connect(mapStateToProps, mapDispatchToProps)(App);
