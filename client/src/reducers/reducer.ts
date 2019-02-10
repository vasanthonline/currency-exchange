import { IState, Status, IAction } from './../redux-store'
import { Rate, Pockets, Conversion } from './../components/component-interface'
import pocket from '../components/pocket/pocket';

export default (state: IState = {}, action: IAction): IState => {
  let newState: IState = (Object.assign({}, state))
  switch (action.type) {
    case 'GET_RATES':
      newState.rates = action.status == Status.SUCCESS ?  (action.payload as Array<Rate>) : []
      delete newState.conversion
      break
    case 'GET_BALANCE':
      newState.pockets = action.status == Status.SUCCESS ?  (action.payload as Pockets) : undefined
      delete newState.conversion
      break
    case 'BALANCE_MODIFIED':
      const pockets = (newState.pockets || {})
      newState.pockets = Object.keys(pockets).reduce((acc: Pockets, currency: string) => {
        acc[currency] = {'currency': pockets[currency].currency, 'symbol': pockets[currency].symbol}
        return acc
      }, {})
      break
    case 'RECV_CONVERT':
      newState.conversion = action.status == Status.SUCCESS ?  (action.payload as Conversion) : undefined
      break
    default:
      return state
  }
  return newState
 }