const util = require("util");
const fs = require("fs");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Notes {
    constructor(){
        this.idDum = 0;
    }
    readNotes(){
        return readFileAsync("db/db.json", "utf8");
    }
    writeNotes(note){
        return writeFileAsync("db/db.json", JSON.stringify(note));
    }
    getNotes(){
        return this.readNotes().then(notes => {
            let addedNotes;
            try{
                addedNotes = [].concat(JSON.parse(notes))
            }
            catch(err){
                addedNotes = [];
            }
            return addedNotes;
        })
    }
    addNotes(note){
        console.log(note);
        const { title, text } = note;
    
        const goodNote = { title, text, id: ++this.idDum }

        console.log(goodNote);
        return this.getNotes().then(notes => [...notes, goodNote]).then(updatedNotes => this.writeNotes(updatedNotes)).then(()=>goodNote);
    }
    deleteNotes(id){
        console.log("we want to delete" + id);
        return this.getNotes().then(notes => notes.filter(note => note.id !== parseInt(id))).then(deletedNotes => this.writeNotes(deletedNotes));
    }

}

module.exports = new Notes();