import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import OpenExchange from './open-exchange-client'
import { Status, Response } from './interface';

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

export default class Main {

  private openExchange: OpenExchange

  constructor() {
    this.openExchange = new OpenExchange()
  }

  async getRates(): Promise<Response> {
    try{
      return await this.openExchange.getRates()
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
}


// API calls
app.get('/api/rates', async (req, res) => {
  const rates = await (new Main().getRates())
  res.status(rates.status  == Status.SUCCESS ? 200 : 500).send(rates)
});

app.get('/api/convert(/:value/:from/:to)', async (req, res) => {
  const conversion = await (new Main().convert(req.params.from, req.params.to, parseFloat(req.params.value)))
  res.status(conversion.status  == Status.SUCCESS ? 200 : 500).send(conversion)
});

// Serve any static files
app.use(express.static(path.join(__dirname, './../../client/build')));
// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
  console.log(path.join(__dirname, './../../client/build', 'index.html'));
  res.sendFile(path.join(__dirname, './../../client/build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));