const fs = require('fs');
const util = require('util');

//turns fs.readFile to a promise
const readFromFile = util.promisify(fs.readFile)

//
const writeToFile = (dest, cont) => {
  fs.writeFile(dest, JSON.stringify(cont, null, 4), (err) => {
    if (err){
      console.log(err);
    } else {
      console.log(`written to ${dest}`);
    }
  });
}

//reads and writes to the file (database) 
const readAndAppend = (cont, file) => {
  fs.readFile(file, 'utf-8', (err,data)=>{
    if (err){
      console.log(err);
    } else {
      const parseData = JSON.parse(data);
      parseData.push(cont);
      writeToFile(file,parseData);
    }
  });
};

const readAndDelete = (id, file) => {
  fs.readFile(file, 'utf-8', (err,data)=>{
    if (err){
      console.log(err);
    } else {
      const parseData = JSON.parse(data);
      const objIndex = parseData.findIndex(obj => obj.id === id);
      parseData.splice(objIndex,1);
      writeToFile(file,parseData);
    }
  });
}

module.exports = {readFromFile,readAndAppend,readAndDelete}