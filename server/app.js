const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const User = require('./schema/User');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(require('cors')());
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
        // console.log(req);
        console.log(req.body);
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          // const newFile = req.body.key + soundCount[req.body.key].toString()
          // console.log(newFile);
          // soundCount['A'] += 1;
          // console.log(soundCount);
          const filename = buf.toString('hex') + path.extname(file.originalname);
          // const filename = req.body.key + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads',
            metadata: req.body.key
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

app.post('/upload', upload.single('file'), (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // res.json({file: req.file});
    // res.status(201).send();
    // Redirect to the home page
    console.log(req.body.key + "-" + req.file.originalname);
    console.log("sound upload");
    res.status(201).send({"key":req.body.key});
    // res.redirect(`/file/${req.body.key}.mp3`);
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

app.get('/:key', (req, res) => {
  gfs.files.findOne({metadata: req.params.key}, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if it is an audio file
    if (file.contentType === 'audio/mpeg') {
      // Read output to browser
      console.log(file);
      res.status(200).send({
        hash: file.filename
      })
    } else {
      res.status(404).json({
        err: 'Not an audio file'
      });
    }


  })
})

app.get('/file/:filename', (req, res) => {
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
        console.log(file);
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } else {
        res.status(404).json({
          err: 'Not an audio file'
        });
      }
    });
  });

app.delete('/:filename', (req, res) => {
  console.log(req.params.filename);
  gfs.remove({ filename: req.params.filename, root: 'uploads' }, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
    }

    res.status(200).send({"msg": `${req.params.filename} has been removed.`});
  });
});


// app.get('/users/:id', (req, res) => {
//   User.findById(req.params.id)
//     .then(user => {
//       if (user) {
//         console.log(user);
//         res.status(200).send(user);
//       } else {
//         console.log('cannot find anyone');
//         res.status(404).send({'msg': 'cannot find anyone'})
//       }  
//     })
// })

// app.post('/users', (req, res) => {
//   User.create(req.body).save()
//     .then(user => {
//       res.status(201).send(user);
//     })
//     .catch(err => {
//       console.log('in here')
//       console.log(err)
//       res.status(500).send(err)
//     })
// })

const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));