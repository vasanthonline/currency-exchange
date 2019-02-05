import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.get('/api/getRates', (req, res) => {
  res.send({ rates: [
    {'currency': 'USD','rate':  0.7}, 
    {'currency': 'GBP','rate':  0.5}, 
    {'currency': 'EUR','rate':  0.8}
  ] });
});


// Serve any static files
app.use(express.static(path.join(__dirname, './../../client/build')));
// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
  console.log(path.join(__dirname, './../../client/build', 'index.html'));
  res.sendFile(path.join(__dirname, './../../client/build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));