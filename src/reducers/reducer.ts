import { IState } from './../redux-store'

export interface Action {
  type: string,
  payload: IState
}

export default (state = {}, action: Action) => {
  switch (action.type) {
   case 'GET_RATES':
    return action.payload
   default:
    return state
  }
 }