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

  async getRates(): Promise<Response> {
    const ratesRequestUrl = `${config.get('openExchange')['ratesApiUrl']}?app_id=${this.apiKey}&symbols=${this.currencies.join()}`
    try{
      const rates = await axios.get(ratesRequestUrl)
      switch(rates.status){
        case 200:
         return Promise.resolve({'status': Status.SUCCESS, 'payload': {'base': rates.data.base, 'rates': rates.data.rates}})
        break
        default:
          return Promise.reject({'status': Status.FAILURE, 'message': `${rates.status} - ${rates.statusText}`})  
      }
    }catch(err){
      return Promise.reject({'status': Status.FAILURE, 'message': `${err.name} - ${err.message}`})
    }
  }

  async convertTo(from: string, to: string, value: number): Promise<Response> {
    const convertRequestUrl = `${config.get('openExchange')['convertApiUrl']}${value}/${from}/${to}?app_id=${this.apiKey}`
    let payload = {'from': from, 'to': to, 'fromValue': value}
    try{
      const rates = await axios.get(convertRequestUrl)
      switch(rates.status){
        case 200:
          const convertedPayload = Object.assign({}, payload, {'toValue':rates.data.response})
          return Promise.resolve({'status': Status.SUCCESS, 'payload': convertedPayload})
          break
        default:
          return Promise.reject({'status': Status.FAILURE, 'payload': payload, 'message': `${rates.status} - ${rates.statusText}`})  
      }
    }catch(err){
      return Promise.reject({'status': Status.FAILURE, 'payload': payload, 'message': `${err.name} - ${err.message}`})
    }
  }
}