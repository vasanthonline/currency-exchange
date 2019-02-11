import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { PocketProps, State, PocketState, Pocket, Pockets } from './../component-interface'

import { ReducerState } from '../../redux-store'
import './pocket.scss'

export class PocketComponent extends React.Component<PocketProps, {}> {

  constructor(props: PocketProps) {
    super(props)
    this.state = {[props.containerType]:{'slideIndex': 0, 'exchangeValue': ''}}
  }

  moveToSlide(pocketSource: string, ev: any) {
    const slideIndex = [...ev.target.parentElement.children].indexOf(ev.target)
    if(slideIndex >= 0){
      this.showSlide(slideIndex, pocketSource)
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
    const oldStatePocketContainer = {...(this.state as State)[pocketContainerClass]}
    oldStatePocketContainer.slideIndex = slideIndex
    oldStatePocketContainer.exchangeValue = ''
    this.setState({[pocketContainerClass]: oldStatePocketContainer}, () => {
      slides[((this.state as State)[pocketContainerClass] as PocketState)['slideIndex']].className += ' active';
      dots[((this.state as State)[pocketContainerClass] as PocketState)['slideIndex']].className += ' active';
      document.querySelectorAll('.exchange-input').forEach((el) => {
        (el as HTMLInputElement).value = ''
      })
    })
    const currency = Object.keys(this.props.pockets)[slideIndex]
    this.props.onSlideChange(pocketContainerClass, currency)
  }

  onInputChange(pocketSource: string, ev: any) {
    const inputVal = ev.target.value
    const decimal = inputVal.split('.')[1]
    if(decimal && decimal.length > 2)
      return alert('Value upto maximum of 2 decimal digits is allowed.')
    const oldStatePocketContainer = {...(this.state as State)[pocketSource]} as PocketState
    oldStatePocketContainer.exchangeValue = inputVal
    this.setState({[pocketSource]: oldStatePocketContainer})
  }

  onInputBlur(pocketSource: string, ev: any) {
    const inputVal = ev.target.value;
    const oldStatePocketContainer = {...(this.state as State)[pocketSource]} as PocketState
    oldStatePocketContainer.exchangeValue = inputVal
    this.setState({[pocketSource]: oldStatePocketContainer}, () => {
      this.props.onExchangeInput(pocketSource, ((this.state as State)[pocketSource] as PocketState))
    })
  }

  onTouchStart(pocketSource: string, e: any){
    const oldStatePocketContainer = {...(this.state as State)[pocketSource]}
    oldStatePocketContainer.touchStartX = e.touches && e.touches[0] && e.touches[0].clientX
    this.setState({[pocketSource]: oldStatePocketContainer})
  }

  onTouchEnd(pocketSource: string, e: any){
    const oldStatePocketContainer = {...(this.state as State)[pocketSource]}
    oldStatePocketContainer.touchEndX = e.touches && e.touches[0] && e.touches[0].clientX
    this.setState({[pocketSource]: oldStatePocketContainer}, () => {
      const statePocketContainer = {...(this.state as State)[pocketSource] as PocketState}
      const diffX = (statePocketContainer.touchStartX || 0) - (statePocketContainer.touchEndX || 0)
      if(diffX > 0)
        this.showSlide(statePocketContainer.slideIndex + 1, pocketSource)
      else if(diffX < 0)
        this.showSlide(statePocketContainer.slideIndex - 1, pocketSource)
    })
  }

  render() {
    const exchangeValue = this.props.value || ((this.state as State)[this.props.containerType] as PocketState).exchangeValue
    const pockets = (this.props.pockets || {})
    return (<div className={this.props.containerType}>
    {(Object.keys(pockets)).map((currency: string, index: number) => {
      return (<div key={index} className={index == 0 ? 'pocket-container active' : 'pocket-container'}>
        <label>{currency}</label>
        <input type='text'
          className='exchange-input'
          value={exchangeValue} 
          onBlur={this.onInputBlur.bind(this, this.props.containerType)} 
          onChange={this.onInputChange.bind(this, this.props.containerType)} 
          placeholder={'Enter ' + pockets[currency].symbol + ' value'} 
        />
        <h3>You have {pockets[currency].symbol}{pockets[currency].balanceAmount}</h3>
      </div>)
    })}
    <div className="dots">
      {(Object.keys(this.props.pockets || {})).map((currency: string, index: number) => {
        return (<button  key={index}
          className={index == 0 ? 'dot active' : 'dot'}
          onClick={this.moveToSlide.bind(this, this.props.containerType)}>
        </button>)
      })}
    </div>
  </div>)
  }

}

const mapDispatchToProps = (dispatch: ThunkDispatch<ReducerState, void, AnyAction>) => ({
  
})

const mapStateToProps = (state: ReducerState) => ({
  ...state
 })

export default connect(mapStateToProps, mapDispatchToProps)(PocketComponent);
