import React, { useState } from 'react';
import { axiosWithAuth } from '../axiosWithAuth';

import AddColors from './AddColors';

const initialColor = {
  color: '',
  code: { hex: '' },
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    console.log({ colorToEdit });
    const id = colorToEdit.id;
    axiosWithAuth()
      .put(`colors/${id}`, colorToEdit)
      .then(() => {
        axiosWithAuth()
          .get(`colors`)
          .then(res => updateColors(res.data));
      });
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    console.log({ color });
    console.log({ colors });
    updateColors(colors.filter(c => c.color !== color.color));
    axiosWithAuth()
      .delete(`colors/${color.id}`)
      .then(res => {
        axiosWithAuth()
          .get('posts')
          .then(res => updateColors(res.data).catch(err => console.log(err)));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map((color, i) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{' '}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
              id={colorToEdit.id}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <AddColors updateColors={updateColors} />
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
