import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { PocketProps, State, PocketState } from './../component-interface'

import { IState } from '../../redux-store'
import './pocket.scss'

class App extends React.Component<PocketProps, {}> {

  constructor(props: PocketProps) {
    super(props)
    this.state = {[props.containerType]:{'slideIndex': 0}}
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
    this.setState({[pocketContainerClass]: oldStatePocketContainer}, () => {
      slides[((this.state as State)[pocketContainerClass] as PocketState)['slideIndex']].className += ' active';
      dots[((this.state as State)[pocketContainerClass] as PocketState)['slideIndex']].className += ' active';
    })
    this.props.onSlideChange(pocketContainerClass, this.props.pockets[slideIndex].currency)
  }

  onInputChange() {

  }

  onInputBlur(pocketSource: string, ev: any) {
    const inputVal = ev.target.value;
    const oldStatePocketContainer = {...(this.state as State)[pocketSource]}
    oldStatePocketContainer.exchangeValue = inputVal
    this.setState({[pocketSource]: oldStatePocketContainer})
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
    return (<div className={this.props.containerType}>
    {this.props.pockets.map((pocket, index) => {
      return (<div key={index} className={index == 0 ? 'pocket-container active' : 'pocket-container'}>
        <label>{pocket.currency}</label>
        <input type='text' 
          value={((this.state as State)[this.props.containerType] as PocketState).exchangeValue} 
          onBlur={this.onInputBlur.bind(this, 'pocket-to')} 
          onChange={this.onInputChange.bind(this, this.props.containerType)} 
          placeholder={'Enter ' + pocket.symbol + ' value'} 
        />
        <h3>You have {pocket.symbol}{pocket.balance}</h3>
      </div>)
    })}
    <div className="dots">
      {this.props.pockets.map((pocket, index) => {
        return (<button  key={index}
          className={index == 0 ? 'dot active' : 'dot'}
          onClick={this.moveToSlide.bind(this, this.props.containerType)}>
        </button>)
      })}
    </div>
  </div>)
  }

}

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, void, AnyAction>) => ({
  
})

const mapStateToProps = (state: object) => ({
  ...state
 })

export default connect(mapStateToProps, mapDispatchToProps)(App);
