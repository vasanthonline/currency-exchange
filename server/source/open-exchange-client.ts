import config from 'config'
import axios from 'axios'
import { Status, Response } from './interface'

export default class OpenExchangeClient {

  private apiKey: string
  private currencies: Array<string>

  constructor() {
    this.apiKey = config.get('openExchange')['apiKey']
    this.currencies = config.get('openExchange')['currencies']
  }

  async getRates(baseCurrency : string = 'USD'): Promise<Response> {
    const baseValidation = this.validateCurrency(baseCurrency)
    if(baseValidation.status == Status.FAILURE)
      return Promise.reject(baseValidation)

    const currenciesTo = Object.keys(this.currencies).filter((currency) => currency != baseCurrency).join()
    const ratesRequestUrl = `${config.get('openExchange')['ratesApiUrl']}?app_id=${this.apiKey}&symbols=${currenciesTo}&base=${baseCurrency}`
    try{
      const rates = await axios.get(ratesRequestUrl)
      switch(rates.status){
        case 200:
          const payload = Object.keys(rates.data.rates).reduce((rateAcc: Array<object>, toCurrency: string) => {
            rateAcc.push({
              'fromCurrency': baseCurrency, 
              'fromSymbol': this.currencies[baseCurrency], 
              'fromValue': 1, 
              'toCurrency': toCurrency, 
              'toSymbol': this.currencies[toCurrency], 
              'toValue': Math.round(rates.data.rates[toCurrency] * 100) / 100
            })
            return rateAcc;
          }, [])
          return Promise.resolve({
           'status': Status.SUCCESS, 
           'payload': payload
          })
        break
        default:
          return Promise.reject({'status': Status.FAILURE, 'message': `${rates.status} - ${rates.statusText}`})  
      }
    }catch(err){
      return Promise.reject({'status': Status.FAILURE, 'message': `${err.name} - ${err.message}`})
    }
  }

  async convertTo(from: string, to: string, value: number): Promise<Response> {
    const fromValidation = this.validateCurrency(from)
    const toValidation = this.validateCurrency(to)
    if(fromValidation.status == Status.FAILURE)
      return Promise.reject(fromValidation)
    if(toValidation.status == Status.FAILURE)
      return Promise.reject(toValidation)

    const ratesRequestUrl = `${config.get('openExchange')['ratesApiUrl']}?symbols=${to}&base=${from}&app_id=${this.apiKey}`
    let payload = {'from': from, 'to': to, 'fromValue': value}
    try{
      const rates = await axios.get(ratesRequestUrl)
      switch(rates.status){
        case 200:
          const toRate = rates.data.rates[to]
          const convertedPayload = Object.assign({}, payload, {'toValue': toRate * value})
          return Promise.resolve({'status': Status.SUCCESS, 'payload': convertedPayload})
          break
        default:
          return Promise.reject({'status': Status.FAILURE, 'payload': payload, 'message': `${rates.status} - ${rates.statusText}`})  
      }
    }catch(err){
      return Promise.reject({'status': Status.FAILURE, 'payload': payload, 'message': `${err.name} - ${err.message}`})
    }
  }

  validateCurrency(inputCurrency: string) {
    const currencyValidation = Object.keys(this.currencies).filter((currency) => currency == inputCurrency)
    if(!currencyValidation || currencyValidation.length == 0)
      return {'status': Status.FAILURE, 'message': 'Invalid currency format.'}
    return {'status': Status.SUCCESS}
  }
}