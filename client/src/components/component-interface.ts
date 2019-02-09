
export interface AppProps {
  getRates?: Function,
  getBalance?: Function,
  convert?: Function,
  conversion?: Conversion,
  rates?: Array<Rate>,
  pockets?: Pockets
}

export interface PocketProps {
  [key: string]: Function | Pockets | string | number,
  pockets: Pockets,
  containerType: string,
  value: number,
  onSlideChange: Function,
  onExchangeInput: Function
}

export interface Conversion {
  from: string,
  to: string,
  fromValue: number,
  toValue: number
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
  exchangeValue?: number,
  touchStartX?: number,
  touchEndX?: number,
  [key : string]: string | number | undefined
}

export interface State {
  [key : string]: PocketState
}