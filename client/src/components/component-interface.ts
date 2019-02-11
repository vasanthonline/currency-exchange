
export interface AppProps {
  getRates?: Function,
  getBalance?: Function,
  modifyBalance?: Function,
  convert?: Function,
  conversion?: Conversion,
  rates?: Array<Rate>,
  pockets?: Pockets
}

export interface PocketProps {
  [key: string]: Function | Pockets | string | number | boolean,
  pockets: Pockets,
  containerType: string,
  value: number | string,
  placeholder?: string,
  readOnly?: boolean,
  onSlideChange: Function,
  onExchangeInput: Function
}

export interface Conversion {
  from: string,
  to: string,
  fromValue: number,
  toValue: number
}


export interface ModifyBalanceAction {
  currency: string,
  amount: number,
  type: string
}

export interface Rate {
  fromCurrency: string,
  fromSymbol: string,
  fromValue?: number, 
  toCurrency: string, 
  toSymbol: string, 
  toValue?: number
}

export interface Pockets {
  [key: string]: Pocket
}

export interface Pocket {
  currency: string,
  symbol: string,
  balanceAmount?: number
}

export interface PocketState {
  slideIndex: number,
  exchangeValue?: number | string,
  touchStartX?: number,
  touchEndX?: number,
  loading?: boolean,
  [key : string]: string | number | undefined | boolean
}

export interface State {
  [key : string]: PocketState
}