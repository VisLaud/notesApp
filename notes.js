const chalk = require("chalk");
const fs = require("fs");

const getNotes = function () {
  "Printing something";
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => {
    return note.title === title;
  });

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("Notes Added"));
  } else {
    console.log(chalk.red.inverse("Note with this title alread exists"));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  let filteredNote = notes.filter((note) => {
    return !(note.title === title);
  });
  if (filteredNote.length !== notes.length) {
    saveNotes(filteredNote);
    console.log(chalk.green.inverse("Notes Deleted"));
  } else {
    console.log(chalk.red.inverse("Note with this title doesn't exist"));
  }
};

const listNote = () => {
  const notes = loadNotes();
  console.log(chalk.blueBright.inverse("NOTES"));
  notes.forEach((note) => {
    console.log(chalk.green(`Title: ${note.title}\n ${note.body}`));
  });
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const readNote = (title) => {
  const notes = loadNotes();
  const found = notes.find((note) => {
    return note.title === title;
  });
  if (found) {
    console.log(`${chalk.blueBright.inverse(found.title)}\n${found.body}`);
  } else console.log("not found");
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNote: listNote,
  readNote: readNote,
};
