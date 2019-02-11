import 'mocha';
import { expect } from 'chai'
import config from 'config'
import axios from'axios'
import MockAdapter from 'axios-mock-adapter';

import OpenExchange from './../source/open-exchange-client'
import {Status} from './../source/interface'

describe('Open Exchange Client', () => {

  it('should return error for rates if open-exchange API is down', async () => {
    const mockResponse = {'name': 'API down', 'message': 'Open exchange API is down'}
    const mock = new MockAdapter(axios)
    const baseCurrency = 'GBP'
    try{  
      const currenciesTo = Object.keys(config.get('openExchange')['currencies']).filter((currency) => currency != baseCurrency).join()
      const apiUrl = `${config.get('openExchange')['ratesApiUrl']}?app_id=${config.get('openExchange')['apiKey']}&symbols=${currenciesTo}&base=${baseCurrency}`
      mock.onGet(apiUrl).reply(500, mockResponse)

      const rates = await new OpenExchange().getRates(baseCurrency)
    }catch(err) {
      expect(err.status).to.equal(Status.FAILURE)
      expect(err.payload).to.deep.equal(mockResponse)
      expect(err.message).to.equal('Error - Request failed with status code 500')
    }
    
  })

  it('should return error for invalid currency input to get rates.', async () => {
    try{
      const rates = await new OpenExchange().getRates('INR')
    }catch(err) {
      expect(err.status).to.equal(Status.FAILURE)
      expect(err.message).to.equal('Invalid currency format.')
    }
  })

  it('should return error for conversion if open-exchange API returns non-200', async () => {
    const mockResponse = {'name': 'Gateway timeout', 'message': 'Open-exchange API failed to respond within time.'}
    const mock = new MockAdapter(axios)
    const fromCurrency = 'EUR'
    const toCurrency = 'USD'
    try{
      const apiUrl = `${config.get('openExchange')['ratesApiUrl']}?symbols=${toCurrency}&base=${fromCurrency}&app_id=${config.get('openExchange')['apiKey']}`
      mock.onGet(apiUrl).reply(504, mockResponse)

      const conversion = await new OpenExchange().convertTo(fromCurrency, toCurrency, 10.55)
    }catch(err) {
      expect(err.status).to.equal(Status.FAILURE)
      expect(err.payload.name).to.deep.equal(mockResponse.name)
      expect(err.payload.message).to.deep.equal(mockResponse.message)
      expect(err.message).to.equal('Error - Request failed with status code 504')
    }
  })

  it('should return error for invalid from currency input to conversion.', async () => {
    try{
      const rates = await new OpenExchange().convertTo('INR', 'USD', 100)
    }catch(err) {
      expect(err.status).to.equal(Status.FAILURE)
      expect(err.message).to.equal('Invalid currency format.')
    }
  })

  it('should return error for invalid to currency input to conversion.', async () => {
    try{
      const rates = await new OpenExchange().convertTo('USD', 'ASD', 5000)
    }catch(err) {
      expect(err.status).to.equal(Status.FAILURE)
      expect(err.message).to.equal('Invalid currency format.')
    }
  })

})
