const chalk = require("chalk");
const yargs = require("yargs");

const notes = require("./notes");

//Customize yarg
yargs.version("16.2.0");

//create add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Body of the note",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    notes.addNote(argv.title, argv.body);
  },
});
//create remove command
yargs.command({
  command: "remove",
  describe: "removes a note",
  builder: {
    title: {
      description: "Title to be removed",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    notes.removeNote(argv.title);
  },
});

//reads the note
yargs.command({
  command: "read",
  describe: "reads a note",
  builder: {
    title: {
      description: "Reads the note",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    notes.readNote(argv.title);
  },
});

//lits the node
yargs.command({
  command: "list",
  describe: "lists a note",
  builder: {
    title: {
      description: "List all the notes",
    },
  },
  handler: () => {
    notes.listNote();
  },
});

//add, remove , read, list

yargs.parse();
