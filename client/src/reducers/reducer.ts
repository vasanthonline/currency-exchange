import { IState } from './../redux-store'

export interface Action {
  type: string,
  payload: IState
}

export default (state = {}, action: Action) => {
  switch (action.type) {
    case 'GET_RATES':
      return action.payload
    case 'GET_BALANCE':
      return action.payload
    case 'ADD_TO_BALANCE':
      return action.payload
    case 'REMOVE_FROM_BALANCE':
      return action.payload
    case 'CONVERT':
      return action.payload
    default:
      return state
  }
 }