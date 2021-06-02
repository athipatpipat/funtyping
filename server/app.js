const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(methodOverride('_method'));
// ========== Will delete this later ============
app.set('view engine', 'ejs');
// ==============================================

// Mongo URI
require("dotenv").config();
const env = process.env;
const mongoURI = `mongodb+srv://${env.DB_USERNAME}:${env.DB_PASSWORD}@${env.DB_HOST}/${env.DB_NAME}?retryWrites=true&w=majority`;
console.log(mongoURI)
const mongoConfig = { useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}
// Create mongo connection
const conn = mongoose.createConnection(mongoURI, mongoConfig);
// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
  const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/upload', upload.single('file'), async (req, res) => {
    // res.json({file: req.file});
    // res.status(201).send();
    // Redirect to the home page
    console.log("sound upload");
    res.redirect('/');
})

app.get('/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
      // Check if files
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: 'No files exist'
        });
      }
  
      // Files exist
      return res.json(files);
    });
});

app.get('/file/:filename', (req, res) => {
    console.log(req.params.id);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
  
      // Check if it is an audio file
      if (file.contentType === 'audio/mpeg') {
        // Read output to browser
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } else {
        res.status(404).json({
          err: 'Not an image'
        });
      }
    });
  });

const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));