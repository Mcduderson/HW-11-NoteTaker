const util = require("util");
const fs = require("fs");
const uuid = require("uuid/v1");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
let id = 0;

class Notes {
    readNotes(){
        return readFileAsync("db/db.json", "utf8");
    }
    writeNotes(note){
        return writeFileAsync("db/db.json", JSON.stringify(note));
    }
    getNotes(){
        return this.readNotes().then(note => {
            let addedNotes;
            try{
                addedNotes = [].concat(JSON.parse(note))
            }
            catch(err){
                addedNotes;
            }
            return addedNotes;
        })
    }
    addNotes(note){
        const { title,text } = note;
        if(!title || !text){
            throw new Error("You must fill out title and text.");
        }
        const goodNote = { title, text, id:id++ }
        return this.getNotes().then(notes => [...notes, goodNote]).then(updatedNotes => this.writeNotes(updatedNotes)).then(()=>goodNote);
    }
    deleteNotes(id){
        return this.getNotes().then(notes => notes.filter(note => note.id !== id)).then(deletedNotes => this.writeNotes(deletedNotes));
    }

}

module.exports = new Notes();