const fs = require('fs');
const chalk = require('chalk');


const readNote = (title) => {
    const notes = loadNotes();
    const viewedNote = notes.find((note) => {
        return note.title === title
    })
    if (viewedNote) {
        console.log(`${chalk.blue("Title")} : ${chalk.green(viewedNote.title)}\n${chalk.blue("Body")}  : ${chalk.green(viewedNote.body)}`);
    } else {
        console.log(chalk.redBright("Oooops..Note not found!"));
    }
}

const listNote = () => {
    const notes = loadNotes();
    console.log(chalk.inverse("\n Your List:"));
    notes.forEach(note => {
        console.log(`${chalk.redBright(note.title)}: ${chalk.blue(note.body)}`);
    });
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => {
        return note.title !== title;
    })

    if (notesToKeep.length !== notes.length) {
        saveNotes(notesToKeep);
        console.log(chalk.green.bold("Note Removed"));
    } else {
        console.log(chalk.red.bold("No note found"));
    }
}

const addNote = (title, body) => {
    const notes = loadNotes();

    const duplicateNotes = notes.find((note) => {
        return note.title === title
    })

    if (!duplicateNotes) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.green('New note added'));
    } else {
        console.log(chalk.red('Note title already taken!'));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNote: listNote,
    readNote: readNote
}
