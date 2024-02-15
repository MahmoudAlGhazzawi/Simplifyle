const tesseract = require('tesseract.js');
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();

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


app.get('/', (req, res) => {
    res.render('index', {data:''}); 
})

app.post('/extractTextFromImage',  upload.single('file'), async (req, res) => {
    console.log(req.file.path); 
    const text = await tesseractConverter(req.file.path);

    // delete File after processing it
    fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error(err)
          return
        }
        // else File is removed
      }) 
    res.render('index', {data:text})
})

app.listen(3000, () => {
    console.log('ON PORT 3000')
})

const tesseractConverter  = async (image) => {
  const worker = await tesseract.createWorker('eng');
  const ret = await worker.recognize(image);
  const text = ret.data.text;
  console.log(text);-
  await worker.terminate();
  return text;
};