import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

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
    if(slideIndex >= 0){
      this.showSlide(slideIndex)
    }
  }

  showSlide(n: number) {
    var slides = document.getElementsByClassName('pocket-container');
    var dots = document.getElementsByClassName('dot');
    console.log(slides)
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

  render() {
    const pockets = [
      {'currency': 'USD', 'symbol': '$', 'balance': 45.30},
      {'currency': 'GBP', 'symbol': '£', 'balance': 200.10},
      {'currency': 'EUR', 'symbol': '€', 'balance': 25.75}
    ]
    return (
      <div className="app">
        <header className="app-header">

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
