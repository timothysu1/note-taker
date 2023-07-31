//Imports
const express = require("express")
const { readFromFile, readAndAppend } = require('./helpers/fsUtils.js');
const uuid = require('./helpers/uuid.js');


const PORT = 3001;
const app = express();
const path = require('path');

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Requests
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get('/api/notes', (req, res) => {
  readFromFile('./db/db.json')
    .then((data => {
      res.json(JSON.parse(data))
    }));
});

app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };
    readAndAppend(newNote, './db/db.json');
    console.log(uuid())
  }
});

/* app.delete('/api/notes', (req, res) => {
  readFromFile('./db/db.json')
    .then((data => {
      res.json(JSON.parse(data))
      console.log(data)
    }));
}); */

//Listener
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`)
})