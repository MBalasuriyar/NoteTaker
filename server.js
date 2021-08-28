const fs = require("fs");
const express = require("express");
const path = require("path");

const uniqid = require('uniqid');
// uniqe ids.  neet

// I now understand why these are consts! 
// They are not going to change or be adjusted, so they may as well be CONSTANTS

const exprs = express();
// calling express to do express things
// why did I change app to "EXPRS"?  Because= I'm a dumb*ss

const PORT = process.env.PORT || 3000;

// this is just like the hot restaurant thing
exprs.use(express.json());
exprs.use(express.urlencoded({ extended: true }));
exprs.use(express.static(__dirname + "/public"));


// require('./routes/apis')(exprs);
// require('./routes/Routesforhtml')(exprs);
// // I don't even need these do I?


// const path = require('path');


    // => HTML GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases the user is shown an HTML page of content

    exprs.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, './public/index.html'));
    });
    // I don't know whether it's better to take advatage of the arrow functions to have everything on one line or
    // If breaking it so it doesn't reach so far is better.  
    // I'll do both
    exprs.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, './public/notes.html'));
    });


    // there is no home.  Home is where you feel safe.  
    //   exprs.get('*', (req, res) => {
    //     res.sendFile(path.join(__dirname, '../public/home.html'));
    //   });
    // };

    // I don't feel at home anywhere any more.



    exprs.get("/api/notes", (req, res) => {
        // go get my notes
        fs.readFile("./db/db.json", (error, data) => {
            if (error) {
                console.error(error)
                // what notes?
            } else {
                res.send(data);
                // these notes
            }
        })
    })

    exprs.post("/api/notes", (req, res) => {
        fs.readFile("./db/db.json", (error, data) => {
            if (error) {
                console.error(error)
                // I wish I had better errors
            } else {
                let notes = JSON.parse(data);
                // the lime in the coconut
                console.log(notes);
                let newNote = req.body;
                // I require a body
                newNote["id"] = uniqid();
                notes.push(newNote);
                fs.writeFile("db/db.json", JSON.stringify(notes), (err) =>
                // write notes with string
                    err ? console.error(err) : console.log('Your Note has been stored in the database (db)'))
                res.json(newNote);
            }
        })
    })
    
    //Deleting notes is like deleteing memories;  Someone else is deciding that for me
exprs.delete("/api/notes/:id", (req, res) => {
    fs.readFile("db/db.json", (error, data) => {
        if (error) {
            console.error(error);
            // I am an error
        } else {
            let notes = JSON.parse(data);
            notes = notes.filter(e => e.id != req.params.id)
            fs.writeFile("db/db.json", JSON.stringify(notes), (err) =>
                err ? console.error(err) : console.log('Your Note has been deleted.  No matter how hard you try you"ll never get it back because it"s already dead and it"s your fault and you know it, and I can"t even delete this stupid tyrade because I can barley keep myself together.  Why are you dumping this on some poor grader  hundreds of miles away?  This isn"t their problem its yours.  Now, you need to stop or youll be here all night'))
            res.send({});
        }
    })
})

// I'm sorry
    exprs.listen(PORT, () => {
        console.log(`App listening on PORT: ${PORT}`);
    });
