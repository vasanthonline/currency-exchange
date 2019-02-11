import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import { PocketComponent } from './pocket';
import store from './../../redux-store';
import { State, PocketState } from './../component-interface'

it('renders Pocket with inital state', () => {
  const div = document.createElement('div');
  let pocketComponent;
  const pocket = ReactDOM.render(<Provider store={store()}><PocketComponent placeholder='' containerType='pocket-from' pockets={undefined} value={undefined} onSlideChange={undefined} onExchangeInput={undefined} ref={c => pocketComponent = c} /></Provider>, div, () => {
    expect(pocketComponent.state['pocket-from'].slideIndex).toEqual(0)
  });
  
  ReactDOM.unmountComponentAtNode(div);
})

it('renders DOM with pocket-container and dots', () => {
  const div = document.createElement('div');
  const pockets = {
    'USD': {'currency': 'USD', 'symbol': '$', 'balanceAmount': 1.15}
  }
  let pocketComponent;
  const pocket = ReactDOM.render(<Provider store={store()}><PocketComponent placeholder='' containerType='pocket-from' pockets={pockets} value={undefined} onSlideChange={undefined} onExchangeInput={undefined} ref={c => pocketComponent = c} /></Provider>, div, () => {
    const domNode = ReactDOM.findDOMNode(pocketComponent)
    expect(domNode.childNodes.length).toEqual(2)
    expect(domNode.firstChild.firstChild.nodeName).toEqual('LABEL')
    expect(domNode.firstChild.lastChild.nodeName).toEqual('H3')
    expect(domNode.lastChild.nodeName).toEqual('DIV')

  });
  
  ReactDOM.unmountComponentAtNode(div);
})

it('renders pocket with input props', () => {
  const div = document.createElement('div');
  const pockets = {
    'USD': {'currency': 'USD', 'symbol': '$', 'balanceAmount': 1.15}
  }
  let pocketComponent;
  const pocket = ReactDOM.render(<Provider store={store()}><PocketComponent placeholder='' containerType='pocket-to' pockets={pockets} value={2.12} onSlideChange={undefined} onExchangeInput={undefined} ref={c => pocketComponent = c} /></Provider>, div, () => {
    const domNode = ReactDOM.findDOMNode(pocketComponent)
    expect(domNode.childNodes.length).toEqual(2)
    expect(domNode.firstChild.firstChild.textContent).toEqual('USD')
    expect((domNode.firstChild.childNodes[1] as HTMLInputElement).value).toEqual('2.12')
    expect(domNode.firstChild.lastChild.textContent).toEqual('You have $1.15')
  });
  
  ReactDOM.unmountComponentAtNode(div);
})

it('renders pocket on exchange value change', () => {
  const div = document.createElement('div');
  const pockets = {
    'USD': {'currency': 'USD', 'symbol': '$', 'balanceAmount': 1.15}
  }
  let pocketComponent, exValue;
  const pocket = ReactDOM.render(<Provider store={store()}><PocketComponent placeholder='' containerType='pocket-from' pockets={pockets} value={undefined} onSlideChange={undefined} onExchangeInput={(ev) => exValue = ev.target.value} ref={c => pocketComponent = c} /></Provider>, div, () => {
    const domNode = ReactDOM.findDOMNode(pocketComponent);
    const oldStatePocketContainer = {...(pocketComponent.state as State)['pocket-from']} as PocketState
    oldStatePocketContainer.exchangeValue = 1.15
    pocketComponent.setState({'pocket-from': oldStatePocketContainer}, () => {
      expect((domNode.firstChild.childNodes[1] as HTMLInputElement).value).toEqual('1.15')
    })
  });
  
  ReactDOM.unmountComponentAtNode(div);
})