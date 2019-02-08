import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.scss';
import App from './components/app/App';
import store from './redux-store';
import * as serviceWorker from './serviceWorker';

const rates = [
  {'fromCurrency': 'USD', 'fromSymbol': '$', 'fromValue': 1, 'toCurrency': 'GBP', 'toSymbol': '£', 'toValue': 7.55},
  {'fromCurrency': 'USD', 'fromSymbol': '$', 'fromValue': 1, 'toCurrency': 'EUR', 'toSymbol': '€', 'toValue': 9.15},
  {'fromCurrency': 'GBP', 'fromSymbol': '£', 'fromValue': 1, 'toCurrency': 'EUR', 'toSymbol': '€', 'toValue': 1.15},
  {'fromCurrency': 'GBP', 'fromSymbol': '£', 'fromValue': 1, 'toCurrency': 'USD', 'toSymbol': '$', 'toValue': 0.75},
  {'fromCurrency': 'EUR', 'fromSymbol': '€', 'fromValue': 1, 'toCurrency': 'USD', 'toSymbol': '$', 'toValue': 0.63},
  {'fromCurrency': 'EUR', 'fromSymbol': '€', 'fromValue': 1, 'toCurrency': 'GBP', 'toSymbol': '£', 'toValue': 0.90}
]
const pockets = [
  {'currency': 'USD', 'symbol': '$', 'balance': 45.30},
  {'currency': 'GBP', 'symbol': '£', 'balance': 200.10},
  {'currency': 'EUR', 'symbol': '€', 'balance': 25.75}
]

ReactDOM.render(<Provider store={store()}>
  <App rates={rates} pockets={pockets} />
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
