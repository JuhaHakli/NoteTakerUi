import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Note from './Note';
import NewNote from './NewNote';

function NoteGrid({ search }) {
  const [notes, setNotes] = useState([]);
  const [people, setPeople] = useState([]);

  const [notesLoading, setNotesLoading] = useState(true);
  const [peopleLoading, setPeopleLoading] = useState(true);

  // Fetch all notes
  useEffect(async () => {
    const result = await axios(
      'https://localhost:5001/Notes',
    );
    // Newest notes are sorted at the top.
    setNotes(result.data.sort((a, b) => b.id - a.id));
    setNotesLoading(false);
  }, []);

  // Fetch all people
  useEffect(async () => {
    const result = await axios(
      'https://localhost:5001/People',
    );
    setPeople(result.data);
    setPeopleLoading(false);
  }, []);

  function deleteNote(id) {
    setNotes(notes.filter((note) => note.id !== id));
    axios.delete(`https://localhost:5001/Notes/${id}`);
  }

  function createNote(note) {
    axios.post('https://localhost:5001/Notes', note)
      .then((res) => {
        setNotes([res.data, ...notes]);
      });
  }

  function updateNote(updatedNote) {
    const index = notes.findIndex((note) => note.id === updatedNote.id);
    notes[index] = updatedNote;
    setNotes(notes);
    axios.put(`https://localhost:5001/Notes/${updatedNote.id}`, updatedNote);
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
