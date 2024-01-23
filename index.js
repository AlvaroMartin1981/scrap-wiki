const axios = require('axios');
const cheerio = require('cheerio')
const express = require('express');
const app = express();

const url = 'https://es.wikipedia.org/wiki/Categor%C3%ADa:M%C3%BAsicos_de_rap'

app.get('/',(req,res)=>{
    axios.get(url).then((response)=>{
        if(response.status ===200){
            const html = response.data
            const $= cheerio.load(html);
            const pageTitle= $('title').text()
            res.send(`
            <h1>${pageTitle}</h1>`)
        }
       
;
    })
})



app.listen(3000, ()=>{
    console.log("Express esta escuchando en el puerto http://localhost3000");
});