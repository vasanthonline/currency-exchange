
export interface AppProps {
  getRates: Function,
  rates: Array<Rate>,
  pockets: Array<Pocket>
}

export interface PocketProps {
  [key: string]: Function | Array<Pocket> | string,
  pockets: Array<Pocket>,
  containerType: string
}

export interface Rate {
  fromCurrency: string,
  fromSymbol: string,
  fromValue?: number, 
  toCurrency: string, 
  toSymbol: string, 
  toValue?: number
}

export interface Pocket {
  currency: string,
  symbol: string,
  balance?: number
}

export interface PocketState {
  slideIndex: number,
  touchStartX?: number,
  touchEndX?: number,
  [key : string]: string | number | undefined
}

export interface State {
  [key : string]: PocketState
}