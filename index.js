const express = require('express');
const request = require('request');
const fetch = require('node-fetch');
const base64 = require('base-64');


const app = express();
const url = 'http://sdevhosttest001/DocMngSignal/odata/standard.odata?$format=json';
const username = 'UsrFor_OData';
const password = '159951';

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
//   res.header('Authorization', 'Basic ' + base64.encode(username + ":" + password))
  next();
});

app.get('/users', (req, res) => {
    request(
        { url: 'http://sdevhosttest001/DocMngSignal/odata/standard.odata?$format=json',
        headers: { 'Authorization': 'Basic ' + base64.encode(username + ":" + password) }
    },
        (error, response, body) => {
          if (error || response.statusCode !== 200) {
              console.log(error, response, body)
              return res.send(body);
          }
    
          res.json(JSON.parse(body));
        }
      )
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));