const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/translate/:language', async (req, res) => {
  const language = req.params.language;
  const text = req.query.text;

  import('./translator.mjs')
    .then(async (translatorModule) => {
      const translatedText = await translatorModule.translateText(text, language);
      console.log(translatedText);
      res.send(translatedText);
    })
    .catch((error) => {
      console.error('Error importing translator.mjs:', error);
      res.status(401).send('Unauthorized');
      res.status(400).send('Bad Request');
      res.status(500).send('Internal Server Error');
    });
});

app.listen(3777, () => {
  console.log('Server running on port 3777');
});

//example:
//http://localhost:3777/translate/Spanish?text=Hello%20World
// returns Hola Mundo

//http://localhost:3777/translate/French?text=Hello%20World
// returns Bonjour le monde