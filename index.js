const PORT = 8000;

const axios = require("axios").default;
const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");

app.use(cors());

app.get('/word', (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
    params: {count: '5', wordLength: '5'},
    headers: {
      'X-RapidAPI-Key': 'e3834d0a91msh3d92b1834c0b6bdp1e308bjsnaf9b1c848a07',
      'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
    res.json(response.data[0]);
  }).catch(function (error) {
    console.error(error);
  });
})
app.listen(PORT, () => console.log("Running on port" + PORT));