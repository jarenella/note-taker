const fs = require("fs");
const express = require("express");
const routes= require("../routes/notes");
const dataBase = require("../db/db.json"); //the database for when the user needs it

const app = express();
//connects the static info in public folder to our server
app.use(express.static('public'));

//loops through all items in the database to find the one with the largest ID and creates a new ID that is +1 higher
function generateID() {
    let latestID;
    let newID;
    const jsonDB = JSON.parse(fs.readFileSync('../db/db.json', {encoding:'utf8', flag:'r'}));
    if (jsonDB.length > 0) {
        for (i=0; i < jsonDB.length; i++) {
            latestID = jsonDB[i].id;
        }
    }
    else if (jsonDB.length === 0) {
        latestID = 0; //if there are no items in the database, the first ID generated will be 0 + 1
    }
    newID = latestID + 1; //if the last largest ID was 5, the newest item's ID will be 6, etc.
    return newID; //the function returns an ID that is 1 greater than the last ID in the database
};

module.exports = generateID;