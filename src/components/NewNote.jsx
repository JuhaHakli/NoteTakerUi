import React, { useState } from 'react';
import PropTypes from 'prop-types';

function NewNote({ createNote, people }) {
  const [text, setText] = useState('');
  const [personInCharge, setPersonInCharge] = useState(null);

  return (
    <div className="card note-item">
      Luo uusi muistiinpano
      <div className="note-item-text">
        <textarea onBlur={(event) => setText(event.target.value)} />
      </div>
      <div>
        Vastuuhenkilö:
        <select onChange={(event) => setPersonInCharge(event.target.value)} className="person-select">
          <option value="0">Ei vastuuhenkilöä</option>
          {people.map((person) => <option key={person.id} value={person.id}>{person.name}</option>)}
        </select>
      </div>
      <div className="note-item-actions">
        <button className="save-button" onClick={() => createNote({ text, personInCharge: Number(personInCharge) })} type="button">Tallenna</button>
      </div>
    </div>
  );
}
NewNote.propTypes = {
  createNote: PropTypes.func.isRequired,
  people: PropTypes.arrayOf(
    PropTypes.shape(
      {
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      },
    ),
  ).isRequired,
};

export default NewNote;
