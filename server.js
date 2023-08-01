//Imports
const express = require("express")
const { readFromFile, readAndAppend, readAndDelete } = require('./helpers/fsUtils.js');
const { v4: uuidv4} = require('uuid');

const PORT = process.env.PORT || 3001;
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
      id: uuidv4(),
    };
    readAndAppend(newNote, './db/db.json');
  }; 
  res.send(console.log('Note added'))
});

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  if (id) {
    readAndDelete(id, './db/db.json');
  };
  res.send(console.log('Note deleted'));
});

//Listener
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`)
})