# Note Taker

## Description

Create important notes that can be accessed later. View previously created notes with a click and delete notes that are completed.

## Built With
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/en/about)
* [Express.js](https://expressjs.com/)
* [uuid](https://www.npmjs.com/package/uuid)

## Installation

To install necessary dependancies, run the following command: 

```
npm i
```
## Usage
The user will be brought to a landing page that will prompt them to press the "Get Started" button to enter the note creation page. The user will then be able to give their note a title and some text to describe the note. When the user wants to save the note, they can press the save button that will appear in the top right of the page. Any saved notes can be accessed on the left side of the page by clicking on the desired task. The user can at anytime create a new note by clicking on the plus sign in the top left of the page. Saved notes can also be deleted by clicking the red trash icon next to each note.

## Learning Points
* Using Express to create RESTful APIs
* Using npm uuid to create unique IDs
* Creating routes in our API

## Important Code
```js
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
```
This portion of code manages the request of a post method to the /api/notes route

## Author Info

### Timothy Su

* [LinkedIn](https://www.linkedin.com/in/timothysu1/)
* [Github](https://github.com/timothysu1)

## License

Please refer to license in the repo. 

## Contributions

Express.js documentation: https://expressjs.com/en/guide/routing.html 