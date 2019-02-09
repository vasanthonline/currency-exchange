import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/root-reducer';
import { Rate, Pockets, Conversion } from './components/component-interface'

export enum Status {
  SUCCESS = 1,
  FAILURE = 0,
}

export interface IState {
  type?: string,
  status?: Status,
  rates?: Array<Rate>,
  conversion?: Conversion,
  pockets?: Pockets,
  message?: string
}

export interface IAction {
  type: string,
  status: Status,
  payload?: Array<Rate> | Pockets | undefined | Status | string | Conversion
}

export interface ReducerState {
  'reducer': IState
}

export default function configureStore() {
 return createStore(
  rootReducer,
  applyMiddleware(thunk)
 );
}

