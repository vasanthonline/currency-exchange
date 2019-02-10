import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import { App } from './App';
import store from './../../redux-store';

it('renders with inital state', () => {
  const div = document.createElement('div');
  let appComponent;
  const app = ReactDOM.render(<Provider store={store()}><App ref={c => appComponent = c} /></Provider>, div, () => {
    expect(appComponent.state['pocket-from'].slideIndex).toEqual(0)
    expect(appComponent.state['pocket-to'].slideIndex).toEqual(0)
  });
  
  ReactDOM.unmountComponentAtNode(div);
});

it('renders DOM with header elements', () => {
  const div = document.createElement('div');
  let appComponent;
  const app = ReactDOM.render(<Provider store={store()}><App ref={c => appComponent = c} /></Provider>, div, () => {
    const domNode = ReactDOM.findDOMNode(appComponent)
    expect(domNode.childNodes.length).toEqual(4)
    expect(domNode.childNodes[0].nodeName).toEqual('HEADER')
  });
  
  ReactDOM.unmountComponentAtNode(div);
});

it('renders rates dropdown', () => {
  const div = document.createElement('div');
  const rates = [
    {'fromCurrency': 'USD', 'fromSymbol': '$', 'fromValue': 1, 'toCurrency': 'EUR', 'toSymbol': '€', 'toValue': 1.15},
    {'fromCurrency': 'USD', 'fromSymbol': '$', 'fromValue': 1, 'toCurrency': 'GBP', 'toSymbol': '£', 'toValue': 1.90}
  ]
  let appComponent;
  const app = ReactDOM.render(<Provider store={store()}><App rates={rates} ref={c => appComponent = c} /></Provider>, div, () => {
    const domNode = ReactDOM.findDOMNode(appComponent)
    const dropDownEl = domNode.childNodes[0].childNodes[1]
    expect(dropDownEl.textContent).toEqual('$1 = €1.15')
  });
  
  ReactDOM.unmountComponentAtNode(div);
});

it('renders pocket slides', () => {
  const div = document.createElement('div');
  const rates = [
    {'fromCurrency': 'USD', 'fromSymbol': '$', 'fromValue': 1, 'toCurrency': 'EUR', 'toSymbol': '€', 'toValue': 1.15},
    {'fromCurrency': 'USD', 'fromSymbol': '$', 'fromValue': 1, 'toCurrency': 'GBP', 'toSymbol': '£', 'toValue': 1.90}
  ]
  const pockets = {
    'USD': {'currency': 'USD', 'symbol': '$', 'balanceAmount': 1.15}
  }
  let appComponent;
  const app = ReactDOM.render(<Provider store={store()}><App rates={rates} pockets={pockets} ref={c => appComponent = c} /></Provider>, div, () => {
    const domNode = ReactDOM.findDOMNode(appComponent)
    const pocketEl = domNode.childNodes[1].childNodes
    expect(pocketEl[0].firstChild.textContent).toEqual('USD')
    expect(pocketEl[0].lastChild.nodeName).toEqual('H3')
    expect(pocketEl[0].lastChild.textContent).toEqual('You have $1.15')
  });
  
  ReactDOM.unmountComponentAtNode(div);
});

function fireClick(node: Element | Node){
  if (document.createEvent) {
      const evt = document.createEvent('MouseEvents');
      evt.initEvent('click', true, false);
      node.dispatchEvent(evt);    
  } else if (typeof node['click'] == 'function') {
      node['click'](); 
  }
}