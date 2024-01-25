const express = require('express')
const app = express()
const axios = require('axios')
const cheerio = require('cheerio')

const url = 'https://es.wikipedia.org/wiki/Categor%C3%ADa:M%C3%BAsicos_de_rap'
const principalURL = 'https://es.wikipedia.org'

app.get('/', async (req, res) => {
  try {
    const response = await axios.get(url)
    const html = response.data
    const $ = cheerio.load(html)

    const links = []
    $('#mw-pages a').each((index, element) => {
      const link = $(element).attr('href')
      links.push(link)
    })
    
    const finalArray = [] 
    
    for(const link of links) {
      const innerURL = `${principalURL}${link}`
      const response = await axios.get(innerURL)
      const innerPage = response.data
      const $ = cheerio.load(innerPage)
      
      
      const obj = {
        imgs: [],
        texts: []
      }
      
      const title = $('h1').text()
      obj.title = title
     
      $('img').each((index, element) => {
        const img = $(element).attr('src')
        obj.imgs.push(img)
        console.log('imgs-->', img)
      })
      
      $('p').each((index, element) => {
          const text = $(element).text()
          obj.texts.push(text)
          console.log('texts-->', text)
        })
      finalArray.push(obj)
    }
        
    res.send(`
    <p>LINKS</p>
    <ul>
      ${links.map(data => `<li>${data}</li>`).join('')}
    </ul>
    <p>Cantantes</p>
    <ul>
      ${finalArray.map(data => `
        <li>
          <h2>${data.title}</h2>
          <p>Imagenes: ${data.imgs.map(img => `<p>${img}</p>`).join('')}</p>
          <p>Textos: ${data.texts.map(text => `<p>${text}</p>`).join('')}</p>
        </li>`
      )}
    </ul>
    `)

  } catch(error) {
    console.log(error)
  }
})


app.listen(3000, () => {
  console.log('Express está escuchando en el puerto http://localhost:3000')
})



/*const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();


const url = 'https://es.wikipedia.org/wiki/Categor%C3%ADa:M%C3%BAsicos_de_rap';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    axios.get(url).then((response) => {
        if (response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);
            const enlaces = [];
            
            
            $('#mw-pages a').each((index, element) => {
                const enlace = "https://es.wikipedia.org" + $(element).attr('href');
                enlaces.push(enlace);
            });
            const datosMusicos = enlaces.map(enlace =>{
                return axios.get(enlace).then((response)=>{
                    if (response.status === 200){
                        const html2 =response.data
                        const $2= cheerio.load(html2);
                        const pagesTitles = $2('title').text()
                        const imgs = [];
                        const textos= $2('p').text()
                        $2('img').each((index, element)=>{
                            const img = $(element).attr('src');
                            imgs.push(img);
                        });
                        return {url: enlaces, pagesTitles, imgs, textos};
                    } else {
                        res.status(404).send('Error al obtener la página principal');
                    }
                })
            });
        }});
    });        

app.listen(3000, () => {
    console.log(`Express está escuchando en el puerto http://localhost:3000`);
});*/
                      


            //res.json(enlaces)
            /*esto esta mal porque me salen los enlaces pero no me abre bien los enlaces
            res.send(`<h2>Enlaces</h2>
            <ul>${enlaces.map((enlace)=>`<li><a href="${url}${enlace}">${enlace}</a></li>`).join('')}
            </ul>            
            `);*/
            
          
    
