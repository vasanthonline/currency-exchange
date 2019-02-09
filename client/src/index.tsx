import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.scss';
import App from './components/app/App';
import store from './redux-store';
import * as serviceWorker from './serviceWorker';


const pockets = [
  {'currency': 'USD', 'symbol': '$', 'balance': 45.30},
  {'currency': 'GBP', 'symbol': '£', 'balance': 200.10},
  {'currency': 'EUR', 'symbol': '€', 'balance': 25.75}
]

ReactDOM.render(<Provider store={store()}>
  <App pockets={pockets} />
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
