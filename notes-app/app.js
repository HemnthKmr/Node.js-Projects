const yargs = require('yargs');
const notes = require('./notes');

//Create ADD command
yargs.command({
    command: 'add',
    description: 'Adding a note!',
    builder: {
        title: {
            description: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            description: "Note Body",
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.addNote(argv.title, argv.body);
    }
})

//Create REMOVE command
yargs.command({
    command: 'remove',
    description: 'Removng a note!',
    builder: {
        title: {
            description: 'Title to be removed',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.removeNote(argv.title);
    }
})

//Create LIST command
yargs.command({
    command: 'list',
    description: 'Listing a note!',
    handler: () => {
        notes.listNote();
    }
})

//Create READ command
yargs.command({
    command: 'read',
    description: 'Reading a note!',
    builder: {
        title: {
            description: 'Note to be read',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.readNote(argv.title);
    }
})

yargs.parse()

