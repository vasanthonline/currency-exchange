import 'mocha';
import { expect } from 'chai'

import Main, { server as appServer } from './../source/main'
import {Status} from './../source/interface'

describe('Main', () => {

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