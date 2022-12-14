const fs = require("fs");
const express = require("express");
const routes= require("./routes/routes");
const generateID = require("./lib/generateID");
const path = require('path');

const app = express();
//connects the static info in public folder to our server
app.use(express.static('public'));

//home page
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/public/index.html'); //index.html page
})

//notes page
app.get("/notes", (req, res) => {
  res.sendFile(__dirname + '/public/notes.html'); //notes.html page
});

//api notes get request
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, './db', 'db.json'));
})

//allows us to use req.body when getting client requests, which parses the JSON input they are sending
app.use(express.json());

//api notes post request
app.post("/api/notes", (req, res) => {
  const newNote = req.body
  //vvv generates a new ID and assigns it to the newID variable vvv
  const newID = generateID();
  newNote.id = newID;
  console.log(newNote);
  //vvv appends the new note to the database file vvv
  fs.readFile('./db/db.json', (err, data) => {
    var json = JSON.parse(data)
    json.push(newNote)
    fs.writeFile("./db/db.json", JSON.stringify(json), () => {console.log("successfully added to database")});
  })
  res.json("Success");
})

//api notes delete request
app.delete("/api/notes/*", (req, res) => {
  const itemToDelete = req.body;
  console.log(itemToDelete); //itemtodelete is an empty object and itemtodelete.id is undefined
  res.send("Successfully deleted");
})


const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);