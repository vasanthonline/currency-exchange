import 'mocha';
import { expect } from 'chai'
import config from 'config'
import axios from'axios'
import MockAdapter from 'axios-mock-adapter';

import Main, { server as appServer } from './../source/main'
import {Status} from './../source/interface'

describe('Main - Integration tests', () => {

  afterEach(() => {
    appServer.close()
  })

  it('Should fetch rates from openexchange client', async () => {
    const main = new Main()
    const rates = await main.getRates('USD')
    expect(rates.status).to.equal(Status.SUCCESS)
    expect(rates.payload.length).to.equal(2)
    expect(rates.payload[0].fromCurrency).to.equal('USD')
    expect(rates.payload[0].toCurrency).is.not.empty
    expect(rates.payload[0].toValue + '').is.not.empty

    expect(rates.payload[1].fromCurrency).to.equal('USD')
    expect(rates.payload[1].toCurrency).is.not.empty
    expect(rates.payload[1].toValue + '').is.not.empty
  })

  it('Should convert from one currency to another', async () => {
    const main = new Main()
    const conversion = await main.convert('USD', 'GBP', 1.50)
    expect(conversion.status).to.equal(Status.SUCCESS)
    expect(conversion.payload.from).to.equal('USD')
    expect(conversion.payload.to).to.equal('GBP')
    expect(conversion.payload.fromValue + '').is.not.empty
    expect(conversion.payload.toValue + '').is.not.empty
  })

  it('Should fetch latest currency balance', async () => {
    const main = new Main()
    const balance = await main.getBalance()
    expect(balance.status).to.equal(Status.SUCCESS)
    expect(balance.payload['USD']).to.deep.equal({ currency: 'USD', symbol: '$', balanceAmount: 0 })
    expect(balance.payload['GBP']).to.deep.equal({ currency: 'GBP', symbol: '£', balanceAmount: 0 })
    expect(balance.payload['EUR']).to.deep.equal({ currency: 'EUR', symbol: '€', balanceAmount: 0 })
  })

  it('Should add to balance as per currency input', async () => {
    const main = new Main()
    const balance = await main.addToBalance('USD', 10.15)
    expect(balance.status).to.equal(Status.SUCCESS)
    expect(balance.payload).to.deep.equal({ currency: 'USD', symbol: '$', balanceAmount: 10.15 })
  })
})

describe('Main - Unit tests', () => {

  it('should return error when rates API return error', async () => {
    const mockResponse = {'name': 'API down', 'message': 'Open exchange API is down'}
    const mock = new MockAdapter(axios)
    const baseCurrency = 'GBP'
    try{  
      const currenciesTo = Object.keys(config.get('openExchange')['currencies']).filter((currency) => currency != baseCurrency).join()
      const apiUrl = `${config.get('openExchange')['ratesApiUrl']}?app_id=${config.get('openExchange')['apiKey']}&symbols=${currenciesTo}&base=${baseCurrency}`
      mock.onGet(apiUrl).reply(500, mockResponse)

      const rates = await new Main().getRates(baseCurrency)
    }catch(err) {
      expect(err.status).to.equal(Status.FAILURE)
      expect(err.payload).to.deep.equal(mockResponse)
      expect(err.message).to.equal('Error - Request failed with status code 500')
    }
  })

  it('should return error when convert API return error', async () => {
    const mockResponse = {'name': 'Service unavailable', 'message': 'Open exchange API is unavailable'}
    const mock = new MockAdapter(axios)
    const fromCurrency = 'EUR'
    const toCurrency = 'USD'
    try{
      const apiUrl = `${config.get('openExchange')['ratesApiUrl']}?symbols=${toCurrency}&base=${fromCurrency}&app_id=${config.get('openExchange')['apiKey']}`
      mock.onGet(apiUrl).reply(504, mockResponse)

      const conversion = await new Main().convert(fromCurrency, toCurrency, 10.55)
    }catch(err) {
      expect(err.status).to.equal(Status.FAILURE)
      expect(err.payload.name).to.deep.equal(mockResponse.name)
      expect(err.payload.message).to.deep.equal(mockResponse.message)
      expect(err.message).to.equal('Error - Request failed with status code 503')
    }
  })

})