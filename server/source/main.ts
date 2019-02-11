import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import config from 'config'

import OpenExchange from './open-exchange-client'
import Balance from './balance'
import { Status, Response } from './interface';

const app = express();
const port = process.env.PORT || config.get('port');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

export default class Main {

  private openExchange: OpenExchange

  constructor() {
    this.openExchange = new OpenExchange()
  }

  async getRates(base: string): Promise<Response> {
    try{
      return await this.openExchange.getRates(base)
    }catch(err){
      return err
    }
  }

  async convert(from: string, to: string, value: number): Promise<Response> {
    try{
      return await this.openExchange.convertTo(from, to, value)
    }catch(err){
      return err
    }
  }

  async getBalance(): Promise<Response> {
    return Balance.getBalance()
  }

  async addToBalance(currency: string, amount: number): Promise<Response> {
    return Balance.addToBalance(currency, amount)
  }

  async removeFromBalance(currency: string, amount: number): Promise<Response> {
    return Balance.removeFromBalance(currency, amount)
  }
}


// API calls
app.get('/api/rates(/:base)', async (req, res) => {
  const rates = await (new Main().getRates((req.params.base || "USD").toUpperCase()))
  res.status(rates.status  == Status.SUCCESS ? 200 : 500).send(rates)
});

app.get('/api/convert(/:value/:from/:to)', async (req, res) => {
  const conversion = await (new Main().convert(req.params.from.toUpperCase(), req.params.to.toUpperCase(), parseFloat(req.params.value)))
  res.status(conversion.status  == Status.SUCCESS ? 200 : 500).send(conversion)
});

app.get('/api/balance', async(req, res) => {
  const balance = await (new Main().getBalance())
  res.status(200).send(balance)
})

app.get('/api/balance/add(/:currency/:amount)', async(req, res) => {
  const currencyBalance = await (new Main().addToBalance(req.params.currency.toUpperCase(), parseFloat(req.params.amount)))
  res.status(200).send(currencyBalance)
})

app.get('/api/balance/remove(/:currency/:amount)', async(req, res) => {
  const currencyBalance = await (new Main().removeFromBalance(req.params.currency.toUpperCase(), parseFloat(req.params.amount)))
  res.status(200).send(currencyBalance)
})

// Serve any static files
app.use(express.static(path.join(__dirname, './../../client/build')));
// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
  console.log(path.join(__dirname, './../../client/build', 'index.html'));
  res.sendFile(path.join(__dirname, './../../client/build', 'index.html'));
});

const server = app.listen(port, () => console.log(`Listening on port ${port}`));

export { server, app }

