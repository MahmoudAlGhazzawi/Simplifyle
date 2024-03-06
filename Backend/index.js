const tesseract = require('tesseract.js');
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const OpenAI = require('openai');
require('dotenv').config();



const openAIApiKey = process.env.OPENAI_API_KEY;
const organizationID = process.env.ORGANIZATION_ID;

const openai = new OpenAI({
  apikey: openAIApiKey,
  organization: organizationID
});

// Falls Upload Ordner nicht existiert
var dir = './uploads';
if(!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

app.use(express.static(path.join(__dirname + '/uploads')));

app.set('view engine', 'ejs');


var filePath = "";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        filePath = file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        cb(
            null,
            filePath
        );
    },
});

const upload = multer({storage:storage});


// Nur für Testseite
app.get('/', (req, res) => {
    res.render('index', {data:''}); 
})



app.post('/extractTextFromImage',  upload.single('file'), async (req, res) => {
    const {language, simplify} = await req.body;

    // read text from image
    const text = await tesseractConverter(req.file.path);

    // delete File after processing it
    fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error(err)
          return
        }
        // else File is removed
      }) 

    // openAI Teil
    var uebersetzterText = await translateInput(text, language, simplify);

    res.json({"text":uebersetzterText});
})

app.listen(3000, () => {
    console.log('ON PORT 3000')
})

const tesseractConverter  = async (image) => {
  const worker = await tesseract.createWorker('deu');
  const ret = await worker.recognize(image);
  const text = ret.data.text;
  //console.log(text);
  await worker.terminate();
  return text;
};

async function translateInput(text, lang, simplify) {
    if(simplify === 'true'){
      lang = `einfaches ${lang}`
    }

    const completion = await openai.chat.completions.create({
      messages: [
        {"role": "system", "content": `Du übersetzt bürokratische briefe auf eine beliebige Sprache, was der User dir schreiben wird.
        Es sollen keine Daten wie (Absender, Empänger, Fußzeile) übersetzt werden sondern nur der Inhalt und Betreff.`},
        { "role": "user", "content": `Übersetzte mir diesen Brief auf ${lang}:
                                      ${text}`}],
      model: "gpt-3.5-turbo",
      //max_tokens:200,
    });
  
    var uebersetzterText = completion.choices[0].message.content;
    //console.log(uebersetzterText);
    return uebersetzterText;
  }