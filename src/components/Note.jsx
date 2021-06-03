import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Note({
  note, people, deleteNote, updateNote,
}) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(note.text);
  const [personInCharge, setPersonInCharge] = useState(note.personInCharge);

  function save() {
    setEditing(false);
    updateNote({
      id: note.id,
      text,
      personInCharge: Number(personInCharge),
    });
  }

  let textfield;
  let button;

  if (editing) {
    textfield = (
      <textarea
        onBlur={(event) => {
          setText(event.target.value);
        }}
        defaultValue={text}
      />
    );
    button = <button type="button" className="save-button" onClick={() => { save(); }}>Tallenna</button>;
  } else {
    textfield = note.text;
    button = <button type="button" onClick={() => setEditing(true)}>Muokkaa</button>;
  }

  return (
    <div className="card note-item">
      <div>
        #
        {note.id}
      </div>
      <div className="note-item-text">{textfield}</div>
      <div>
        Vastuuhenkilö:
        <select onChange={(event) => setPersonInCharge(event.target.value)} value={personInCharge} disabled={!editing} className="person-select">
          <option value="0">Ei vastuuhenkilöä</option>
          {people.map((person) => <option key={person.id} value={person.id}>{person.name}</option>)}
        </select>
      </div>
      <div className="note-item-actions">
        {button}
        <button onClick={() => deleteNote(note.id)} type="button" className="delete-button">Poista</button>
      </div>
    </div>
  );
}
Note.propTypes = {
  note: PropTypes.shape(
    {
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      personInCharge: PropTypes.number.isRequired,
    },
  ).isRequired,
  people: PropTypes.arrayOf(
    PropTypes.shape(
      {
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      },
    ),
  ).isRequired,
  deleteNote: PropTypes.func.isRequired,
  updateNote: PropTypes.func.isRequired,
};

export default Note;
