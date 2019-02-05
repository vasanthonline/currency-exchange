import { createStore, applyMiddleware, Store, AnyAction } from 'redux';
import thunk, {ThunkMiddleware} from 'redux-thunk';
import rootReducer from './reducers/root-reducer';

export interface IState {
  rates: Array<Rate>
}

interface Rate {
  'currency': string,
  'rate': number
}

export default function configureStore() {
 return createStore(
  rootReducer,
  applyMiddleware(thunk)
 );
}

