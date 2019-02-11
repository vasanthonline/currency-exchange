import 'mocha';
import { expect } from 'chai'

import Balance from './../source/balance'
import {Status} from './../source/interface'

describe('Balance', () => {

  afterEach(() => {
    Balance.initialize()
  })

  it('should instantiate Balance with balanceDb', () => {
    const balance = Balance.getBalance()
    expect(balance.status).to.equal(Status.SUCCESS)
    expect(balance.payload['USD']).to.deep.equal({ currency: 'USD', symbol: '$', balanceAmount: 0 })
    expect(balance.payload['GBP']).to.deep.equal({ currency: 'GBP', symbol: '£', balanceAmount: 0 })
    expect(balance.payload['EUR']).to.deep.equal({ currency: 'EUR', symbol: '€', balanceAmount: 0 })
  })

  it('should remove from balance based on currency', () => {
    const balance = Balance.removeFromBalance('USD', 20.25)
    expect(balance.status).to.equal(Status.SUCCESS)
    expect(balance.payload).to.deep.equal({ currency: 'USD', symbol: '$', balanceAmount: -20.25 })
  })

  it('should add to balance based on currency', () => {
    const balance = Balance.addToBalance('GBP', 10)
    expect(balance.status).to.equal(Status.SUCCESS)
    expect(balance.payload).to.deep.equal({ currency: 'GBP', symbol: '£', balanceAmount: 10 })
  })

})
