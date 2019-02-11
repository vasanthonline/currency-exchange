import config from 'config'
import { Status, Response } from './interface'

export default class Balance {

  private static balanceDb: IBalances

  static initialize() {
    const currencies = config.get('openExchange')['currencies']
    Balance.balanceDb = Object.keys(currencies).reduce((balanceAcc: IBalances, currency: string) => {
      balanceAcc[currency] = {'currency': currency, 'symbol': currencies[currency], balanceAmount: 0}
      return balanceAcc
    }, {})
  }

  static addToBalance(currency: string, amount: number) {
    if(!Balance.balanceDb) Balance.initialize()
    const existingBalance = Balance.balanceDb[currency]['balanceAmount']
    Balance.balanceDb[currency]['balanceAmount'] = Math.round((existingBalance + amount) * 100) / 100
    return {'status': Status.SUCCESS, 'payload': Balance.balanceDb[currency]}
  }

  static removeFromBalance(currency: string, amount: number) {
    if(!Balance.balanceDb) Balance.initialize()
    const existingBalance = Balance.balanceDb[currency]['balanceAmount']
    Balance.balanceDb[currency]['balanceAmount'] = Math.round((existingBalance - amount) * 100) / 100
    return {'status': Status.SUCCESS, 'payload': Balance.balanceDb[currency]}
  }

  static getBalance() {
    if(!Balance.balanceDb) Balance.initialize()
    return {'status': Status.SUCCESS, 'payload': Balance.balanceDb}
  }

}

interface IBalances {
  [key: string]: IBalance
}

interface IBalance {
  currency: string,
  symbol: string,
  balanceAmount: number
}