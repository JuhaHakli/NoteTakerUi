import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Api from '../Api';
import Note from './Note';
import NewNote from './NewNote';

function NoteGrid({ search }) {
  const [notes, setNotes] = useState([]);
  const [people, setPeople] = useState([]);

  const [notesLoading, setNotesLoading] = useState(true);
  const [peopleLoading, setPeopleLoading] = useState(true);

  const api = new Api(process.env.REACT_APP_API_URL);

  // Fetch all notes
  useEffect(async () => {
    const result = await api.getNotes();
    setNotes(result.data.sort((a, b) => b.id - a.id));
    setNotesLoading(false);
  }, []);

  // Fetch all people
  useEffect(async () => {
    const result = await api.getPeople();
    setPeople(result.data);
    setPeopleLoading(false);
  }, []);

  // Methods for manipulating the notes-array and performing API-calls.
  function deleteNote(id) {
    setNotes(notes.filter((note) => note.id !== id));
    api.deleteNotes(id);
  }

  function createNote(note) {
    api.postNotes(note)
      .then((res) => {
        setNotes([res.data, ...notes]);
      });
  }

  function updateNote(updatedNote) {
    setNotes(notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }
      return note;
    }));
    api.putNotes(updatedNote.id, updatedNote);
  }

  function searchFromNotes(note) {
    return search === '' || (
      note.text.toLowerCase().indexOf(search.toLowerCase()) > -1
    );
  }

  if (notesLoading || peopleLoading) {
    return (
      <div>Ladataan...</div>
    );
  }

  return (
    <div className="note-grid">
      <NewNote createNote={createNote} people={people} />
      { notes.filter(searchFromNotes)
        .map((note) => (
          <Note
            key={note.id}
            note={note}
            people={people}
            deleteNote={deleteNote}
            updateNote={updateNote}
          />
        ))}
    </div>
  );
}
NoteGrid.defaultProps = {
  search: '',
};
NoteGrid.propTypes = {
  search: PropTypes.string,
};

export default NoteGrid;
