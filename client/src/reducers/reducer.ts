import { IState, Status, IAction } from './../redux-store'
import { Rate, Pockets, Conversion } from './../components/component-interface'

export default (state: IState = {}, action: IAction): IState => {
  let newState: IState = (Object.assign({}, state))
  switch (action.type) {
    case 'GET_RATES':
      newState.rates = action.status == Status.SUCCESS ?  (action.payload as Array<Rate>) : []
      break
    case 'GET_BALANCE':
      newState.pockets = action.status == Status.SUCCESS ?  (action.payload as Pockets) : undefined
      break
    case 'ADD_TO_BALANCE':
      return action
    case 'REMOVE_FROM_BALANCE':
      return action
    case 'RECV_CONVERT':
      newState.conversion = action.status == Status.SUCCESS ?  (action.payload as Conversion) : undefined
      break
    default:
      return state
  }
  return newState
 }